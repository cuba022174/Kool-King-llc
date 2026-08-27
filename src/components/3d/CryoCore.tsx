"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BADGE_RADIUS = 1.05;
const RIM_TUBE = 0.09;
const ACCENT_RADIUS = 0.94;

const CROWN_RADIUS = BADGE_RADIUS;
const CROWN_ARC = Math.PI * 0.56; // ~101°, arched across the top of the badge
const CROWN_START_ANGLE = Math.PI / 2 - CROWN_ARC / 2;
const CROWN_BAND_TUBE = 0.045;
const SPIKE_COUNT = 5;
const SPIKE_HEIGHTS = [0.3, 0.42, 0.52, 0.42, 0.3];
const SPIKE_CONE_RADIUS = 0.1;
const SPIKE_BALL_RADIUS = 0.065;

const SNOWFLAKE_BRANCHES = 6;
const BRANCH_LENGTH = 0.5;
const BRANCH_WIDTH = 0.05;
const BARB_LENGTH = 0.2;
const BARB_WIDTH = 0.035;
const BARB_FRACTION = 0.68; // how far along the branch the barbs attach

interface CryoCoreProps {
  /** Overall scale of the crown + badge assembly. */
  scale?: number;
}

/**
 * Procedural brand mark: a titanium crown arched over a circular
 * snowflake badge, matching the Kool King LLC logo. Built entirely
 * from Three.js primitives so it needs no external model assets.
 */
export default function CryoCore({ scale = 1 }: CryoCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const snowflakeRef = useRef<THREE.Group>(null);

  // Brushed titanium — the crown and the badge rim.
  const titaniumMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#e4e8ec",
        metalness: 0.95,
        roughness: 0.18,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
        envMapIntensity: 1.4,
      }),
    [],
  );

  // Dark navy badge face, set slightly behind the rim.
  const badgeMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#0d1b33",
        metalness: 0.35,
        roughness: 0.5,
        clearcoat: 0.4,
      }),
    [],
  );

  // Slim laser-blue accent ring just inside the titanium rim.
  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#3b82f6",
        emissive: new THREE.Color("#3b82f6"),
        emissiveIntensity: 0.9,
        roughness: 0.3,
        metalness: 0.2,
      }),
    [],
  );

  // Transmissive, glowing glass — the snowflake, jewels, and finials.
  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#00f0ff",
        transmission: 0.85,
        ior: 1.5,
        thickness: 0.8,
        roughness: 0.05,
        metalness: 0,
        clearcoat: 1,
        emissive: new THREE.Color("#00f0ff"),
        emissiveIntensity: 0.3,
        envMapIntensity: 1.4,
      }),
    [],
  );

  // Crown spikes, evenly spaced across the front arc and anchored on
  // the badge's rim radius, oriented to point radially outward.
  const spikes = useMemo(
    () =>
      Array.from({ length: SPIKE_COUNT }, (_, i) => {
        const angle = CROWN_START_ANGLE + (i / (SPIKE_COUNT - 1)) * CROWN_ARC;
        return {
          position: [
            Math.cos(angle) * CROWN_RADIUS,
            Math.sin(angle) * CROWN_RADIUS,
            0.1,
          ] as [number, number, number],
          rotationZ: angle - Math.PI / 2,
          height: SPIKE_HEIGHTS[i] ?? 0.5,
        };
      }),
    [],
  );

  // Six-branch snowflake, each with a pair of angled barbs and a tip sparkle.
  const snowflakeBranchAngles = useMemo(
    () =>
      Array.from(
        { length: SNOWFLAKE_BRANCHES },
        (_, i) => (i / SNOWFLAKE_BRANCHES) * Math.PI * 2,
      ),
    [],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // A gentle sway and bob rather than a full spin, so the badge
      // keeps reading front-on like a medallion.
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.22;
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.05;
    }
    if (snowflakeRef.current) {
      snowflakeRef.current.rotation.z += delta * 0.08;
    }
    // Pulsing neon glow shared by every glass surface at once — kept
    // restrained so bloom doesn't blow the thin shapes into a blob.
    const pulse = 0.3 + 0.2 * Math.sin(t * 2);
    glassMaterial.emissiveIntensity = pulse;
    accentMaterial.emissiveIntensity = 0.6 + 0.3 * Math.sin(t * 2 + 1);
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Badge face + rim */}
      <mesh material={badgeMaterial} position={[0, 0, -0.16]}>
        <circleGeometry args={[BADGE_RADIUS, 48]} />
      </mesh>
      <mesh material={accentMaterial} position={[0, 0, -0.06]}>
        <torusGeometry args={[ACCENT_RADIUS, 0.018, 16, 64]} />
      </mesh>
      <mesh material={titaniumMaterial}>
        <torusGeometry args={[BADGE_RADIUS, RIM_TUBE, 24, 64]} />
      </mesh>

      {/* Snowflake emblem, centered on the badge */}
      <group ref={snowflakeRef}>
        <mesh material={glassMaterial} position={[0, 0, 0.02]}>
          <octahedronGeometry args={[0.11, 0]} />
        </mesh>
        {snowflakeBranchAngles.map((angle, i) => (
          <group key={i} rotation={[0, 0, angle]}>
            <mesh material={glassMaterial} position={[0, BRANCH_LENGTH / 2, 0.02]}>
              <boxGeometry args={[BRANCH_WIDTH, BRANCH_LENGTH, 0.05]} />
            </mesh>
            <mesh
              material={glassMaterial}
              position={[0.1, BRANCH_LENGTH * BARB_FRACTION, 0.02]}
              rotation={[0, 0, Math.PI / 4]}
            >
              <boxGeometry args={[BARB_WIDTH, BARB_LENGTH, 0.04]} />
            </mesh>
            <mesh
              material={glassMaterial}
              position={[-0.1, BRANCH_LENGTH * BARB_FRACTION, 0.02]}
              rotation={[0, 0, -Math.PI / 4]}
            >
              <boxGeometry args={[BARB_WIDTH, BARB_LENGTH, 0.04]} />
            </mesh>
            <mesh material={glassMaterial} position={[0, BRANCH_LENGTH + 0.04, 0.02]}>
              <octahedronGeometry args={[0.04, 0]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Crown, arched across the top of the badge */}
      <mesh
        material={titaniumMaterial}
        rotation={[0, 0, CROWN_START_ANGLE]}
        position={[0, 0, 0.1]}
      >
        <torusGeometry
          args={[CROWN_RADIUS, CROWN_BAND_TUBE, 16, 64, CROWN_ARC]}
        />
      </mesh>
      {spikes.map((spike, i) => (
        <group key={i} position={spike.position} rotation={[0, 0, spike.rotationZ]}>
          <mesh material={titaniumMaterial} position={[0, spike.height / 2, 0]}>
            <coneGeometry args={[SPIKE_CONE_RADIUS, spike.height, 6]} />
          </mesh>
          <mesh material={glassMaterial} position={[0, spike.height + 0.06, 0]}>
            <sphereGeometry args={[SPIKE_BALL_RADIUS, 16, 16]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
