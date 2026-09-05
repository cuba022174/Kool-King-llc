"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

// The exact, unmodified Kool King LLC logo file - the same asset used in
// the Navbar, Footer, and MobileDrawer. Nothing here redraws or
// reinterprets it; it's only given real depth and motion.
const LOGO_SRC = "/brand/kool-king-logo.png";
const LOGO_ASPECT = 1761 / 893;

const PLAQUE_WIDTH = 2.8;
const PLAQUE_HEIGHT = PLAQUE_WIDTH / LOGO_ASPECT;
const PLAQUE_DEPTH = 0.12;

// The badge sways rather than fully spins - a wide, thin plate spends most
// of a full rotation edge-on, which would hide the logo far more than it
// shows it off. A gentle wobble keeps the face toward the camera while
// still reading as alive.
const SWAY_Y_SPEED = 0.5;
const SWAY_Y_AMPLITUDE = 0.45; // ~26 degrees
const SWAY_X_SPEED = 0.35;
const SWAY_X_AMPLITUDE = 0.08;
const BOB_SPEED = 0.9;
const BOB_AMPLITUDE = 0.08;

/**
 * The exact Kool King LLC logo, rendered as a floating, gently turning 3D
 * plaque: the unaltered artwork on the front face (rendered unlit so its
 * colors reproduce exactly, unaffected by scene lighting or tone mapping),
 * with a plain dark edge for real depth - nothing added to the design
 * itself.
 */
export function KoolKingLogo3D() {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture(LOGO_SRC);

  useEffect(() => {
    // Three.js textures are meant to be configured imperatively after
    // load - this isn't a React immutability violation.
    // eslint-disable-next-line react-hooks/immutability
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  // Front face: the logo, exactly as provided, unlit so its colors are
  // never shifted by scene lighting or tone mapping.
  const frontMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }),
    [texture],
  );

  // Edges/back: a plain dark tone (matching the logo artwork's own near-
  // black border) so the extrusion reads as depth, not as decoration
  // added to the logo.
  const edgeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#060b19"),
        metalness: 0.4,
        roughness: 0.6,
      }),
    [],
  );

  // BoxGeometry face order is [+x, -x, +y, -y, +z, -z]; the camera faces
  // +z by default, so that's where the logo texture goes.
  const materials = useMemo(
    () => [edgeMaterial, edgeMaterial, edgeMaterial, edgeMaterial, frontMaterial, edgeMaterial],
    [edgeMaterial, frontMaterial],
  );

  useEffect(() => {
    return () => {
      edgeMaterial.dispose();
      frontMaterial.dispose();
    };
  }, [edgeMaterial, frontMaterial]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const elapsed = state.clock.elapsedTime;
    group.rotation.y = Math.sin(elapsed * SWAY_Y_SPEED) * SWAY_Y_AMPLITUDE;
    group.rotation.x = Math.sin(elapsed * SWAY_X_SPEED + Math.PI / 3) * SWAY_X_AMPLITUDE;
    group.position.y = Math.sin(elapsed * BOB_SPEED) * BOB_AMPLITUDE;
  });

  return (
    <group ref={groupRef}>
      <mesh material={materials}>
        <boxGeometry args={[PLAQUE_WIDTH, PLAQUE_HEIGHT, PLAQUE_DEPTH]} />
      </mesh>
    </group>
  );
}
