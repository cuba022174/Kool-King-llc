"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// Real asset dimensions (public/brand/kool-king-logo.png), so the plate
// never stretches the artwork.
const LOGO_ASPECT = 1761 / 893;
const PLATE_WIDTH = 3.1;
const PLATE_HEIGHT = PLATE_WIDTH / LOGO_ASPECT;
const PLATE_DEPTH = 0.07;
const PLATE_RADIUS = 0.1;
const GLOW_MARGIN = 1.07;

const ENTRANCE_DURATION = 1.15;
const ENTRANCE_DURATION_REDUCED = 0.4;

interface CryoCoreProps {
  /** Overall (resting) scale of the plaque. */
  scale?: number;
  /** Drop the continuous sway/bob/pulse and shorten the entrance for
   * prefers-reduced-motion viewers. */
  reduceMotion?: boolean;
}

function roundedRectShape(width: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const hw = width / 2;
  const hh = height / 2;
  shape.moveTo(-hw + radius, -hh);
  shape.lineTo(hw - radius, -hh);
  shape.quadraticCurveTo(hw, -hh, hw, -hh + radius);
  shape.lineTo(hw, hh - radius);
  shape.quadraticCurveTo(hw, hh, hw - radius, hh);
  shape.lineTo(-hw + radius, hh);
  shape.quadraticCurveTo(-hw, hh, -hw, hh - radius);
  shape.lineTo(-hw, -hh + radius);
  shape.quadraticCurveTo(-hw, -hh, -hw + radius, -hh);
  shape.closePath();
  return shape;
}

/**
 * The real Kool King LLC brand plate, mounted as an actual 3D object:
 * an extruded rounded-rect card (brushed-titanium edge, the logo image
 * on its face) sitting in front of a pulsing glass-blue backlight —
 * not a procedural guess at the logo, the logo itself, lit and staged.
 */
export default function CryoCore({ scale = 1, reduceMotion = false }: CryoCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mountTime = useRef<number | null>(null);

  const logoTexture = useTexture("/brand/kool-king-logo.png");
  logoTexture.colorSpace = THREE.SRGBColorSpace;
  logoTexture.anisotropy = 8;

  // The plate face shows the real artwork under a glossy varnish —
  // reacts to the studio environment like a lacquered emblem.
  const faceMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: logoTexture,
        roughness: 0.32,
        metalness: 0.08,
        clearcoat: 1,
        clearcoatRoughness: 0.14,
        envMapIntensity: 1.2,
      }),
    [logoTexture],
  );

  // Brushed titanium — the plate's extruded edge.
  const edgeMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#e4e8ec",
        metalness: 0.95,
        roughness: 0.18,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
        envMapIntensity: 1.6,
      }),
    [],
  );

  // Pulsing laser-blue backlight, just behind the plate.
  const glowMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#3b82f6",
        emissive: new THREE.Color("#3b82f6"),
        emissiveIntensity: 0.6,
        roughness: 0.4,
        metalness: 0.1,
        side: THREE.DoubleSide,
      }),
    [],
  );

  const plateGeometry = useMemo(() => {
    const shape = roundedRectShape(PLATE_WIDTH, PLATE_HEIGHT, PLATE_RADIUS);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: PLATE_DEPTH,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.018,
      bevelSegments: 3,
      curveSegments: 16,
    });
    geometry.center();
    return geometry;
  }, []);

  const glowGeometry = useMemo(
    () =>
      new THREE.PlaneGeometry(
        PLATE_WIDTH * GLOW_MARGIN,
        PLATE_HEIGHT * GLOW_MARGIN,
      ),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mountTime.current === null) mountTime.current = t;
    const age = t - mountTime.current;

    // Entrance: materialize in with an overshooting ease instead of
    // simply being present on the first frame. Shortened (and without
    // the overshoot wobble) for reduced-motion viewers.
    const duration = reduceMotion ? ENTRANCE_DURATION_REDUCED : ENTRANCE_DURATION;
    const entranceT = THREE.MathUtils.clamp(age / duration, 0, 1);
    const eased = 1 - Math.pow(1 - entranceT, 3);
    const overshoot = reduceMotion
      ? 1
      : 1 + Math.sin(entranceT * Math.PI) * 0.06 * (1 - entranceT);

    if (groupRef.current) {
      groupRef.current.scale.setScalar(scale * eased * overshoot);
      // A gentle sway and bob rather than a full spin, so the plate
      // keeps reading front-on like a mounted plaque — dropped
      // entirely under reduced motion.
      groupRef.current.rotation.y = reduceMotion ? 0 : Math.sin(t * 0.3) * 0.18;
      groupRef.current.position.y = reduceMotion ? 0 : Math.sin(t * 0.6) * 0.05;
    }

    // Pulsing backlight, plus a brief brighter flash while arriving.
    // The continuous pulse is motion too, so it's held steady when
    // reduced motion is preferred.
    const flash = reduceMotion ? 0 : Math.max(0, 1 - age / 0.7) * 0.8;
    const pulse = reduceMotion ? 0 : 0.3 * Math.sin(t * 2);
    glowMaterial.emissiveIntensity = 0.55 + pulse + flash;
  });

  return (
    <group ref={groupRef} scale={0}>
      <mesh geometry={glowGeometry} material={glowMaterial} position={[0, 0, -0.12]} />
      <mesh geometry={plateGeometry} material={[faceMaterial, edgeMaterial]} />
    </group>
  );
}
