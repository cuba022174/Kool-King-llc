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
const CROWN_BAND_TUBE = 0.05;
const CROWN_INLAY_TUBE = 0.018;
const SPIKE_COUNT = 5;
const SPIKE_HEIGHTS = [0.3, 0.42, 0.52, 0.42, 0.3];
const SPIKE_CONE_RADIUS = 0.1;
const SPIKE_BALL_RADIUS = 0.065;

const SNOWFLAKE_BRANCHES = 6;
// Each arm tapers in two segments (thick near the hub, thin toward the
// tip) with barbs at two heights and a forked crystalline tip, rather
// than a single uniform box — the detail that reads as "ice crystal"
// instead of "generic star."
const INNER_LEN = 0.26;
const INNER_WIDTH = 0.078;
const OUTER_LEN = 0.22;
const OUTER_WIDTH = 0.055;
const BARB_LEN = 0.15;
const BARB_WIDTH = 0.04;
const FORK_LEN = 0.11;
const FORK_WIDTH = 0.03;
const FORK_ANGLE = Math.PI / 7;

const ENTRANCE_DURATION = 1.15;

interface CryoCoreProps {
  /** Overall (resting) scale of the crown + badge assembly. */
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
  const mountTime = useRef<number | null>(null);

  // Brushed titanium — the crown and the badge rim.
  const titaniumMaterial = useMemo(
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

  // Dark navy badge face, set slightly behind the rim.
  const badgeMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#0d1b33",
        metalness: 0.35,
        roughness: 0.5,
        clearcoat: 0.4,
        envMapIntensity: 0.8,
      }),
    [],
  );

  // Slim laser-blue accent — the badge ring and the crown's jewel inlay.
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
        emissiveIntensity: 0.6,
        envMapIntensity: 1.8,
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

  // Small gems set into the crown band between the spikes.
  const bandGems = useMemo(
    () =>
      Array.from({ length: SPIKE_COUNT - 1 }, (_, i) => {
        const a = CROWN_START_ANGLE + (i / (SPIKE_COUNT - 1)) * CROWN_ARC;
        const b = CROWN_START_ANGLE + ((i + 1) / (SPIKE_COUNT - 1)) * CROWN_ARC;
        const angle = (a + b) / 2;
        return [
          Math.cos(angle) * CROWN_RADIUS,
          Math.sin(angle) * CROWN_RADIUS,
          0.13,
        ] as [number, number, number];
      }),
    [],
  );

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
    if (mountTime.current === null) mountTime.current = t;
    const age = t - mountTime.current;

    // Entrance: materialize in with an overshooting ease instead of
    // simply being present on the first frame.
    const entranceT = THREE.MathUtils.clamp(age / ENTRANCE_DURATION, 0, 1);
    const eased = 1 - Math.pow(1 - entranceT, 3);
    const overshoot = 1 + Math.sin(entranceT * Math.PI) * 0.06 * (1 - entranceT);

    if (groupRef.current) {
      groupRef.current.scale.setScalar(scale * eased * overshoot);
      // A gentle sway and bob rather than a full spin, so the badge
      // keeps reading front-on like a medallion.
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.22;
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.05;
    }
    if (snowflakeRef.current) {
      snowflakeRef.current.rotation.z += delta * 0.08;
    }

    // Pulsing neon glow, plus a brief brighter flash while arriving.
    const flash = Math.max(0, 1 - age / 0.7) * 1.1;
    const pulse = 0.6 + 0.35 * Math.sin(t * 2);
    glassMaterial.emissiveIntensity = pulse + flash;
    accentMaterial.emissiveIntensity = 0.7 + 0.35 * Math.sin(t * 2 + 1) + flash * 0.6;
  });

  return (
    <group ref={groupRef} scale={0}>
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
            {/* Inner segment — thick near the hub */}
            <mesh material={glassMaterial} position={[0, INNER_LEN / 2, 0.02]}>
              <boxGeometry args={[INNER_WIDTH, INNER_LEN, 0.06]} />
            </mesh>
            {/* Outer segment — tapers toward the tip */}
            <mesh
              material={glassMaterial}
              position={[0, INNER_LEN + OUTER_LEN / 2, 0.02]}
            >
              <boxGeometry args={[OUTER_WIDTH, OUTER_LEN, 0.045]} />
            </mesh>

            {/* Barbs at two heights, like a real snowflake arm */}
            {[INNER_LEN * 0.62, INNER_LEN + OUTER_LEN * 0.55].map((t, bi) => (
              <group key={bi}>
                <mesh
                  material={glassMaterial}
                  position={[0.085, t, 0.02]}
                  rotation={[0, 0, Math.PI / 4]}
                >
                  <boxGeometry args={[BARB_WIDTH, BARB_LEN, 0.035]} />
                </mesh>
                <mesh
                  material={glassMaterial}
                  position={[-0.085, t, 0.02]}
                  rotation={[0, 0, -Math.PI / 4]}
                >
                  <boxGeometry args={[BARB_WIDTH, BARB_LEN, 0.035]} />
                </mesh>
              </group>
            ))}

            {/* Forked crystalline tip */}
            <group position={[0, INNER_LEN + OUTER_LEN, 0.02]}>
              <group rotation={[0, 0, FORK_ANGLE]}>
                <mesh material={glassMaterial} position={[0, FORK_LEN / 2, 0]}>
                  <boxGeometry args={[FORK_WIDTH, FORK_LEN, 0.03]} />
                </mesh>
              </group>
              <group rotation={[0, 0, -FORK_ANGLE]}>
                <mesh material={glassMaterial} position={[0, FORK_LEN / 2, 0]}>
                  <boxGeometry args={[FORK_WIDTH, FORK_LEN, 0.03]} />
                </mesh>
              </group>
            </group>
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
      {/* Jewel-channel inlay running down the center of the band */}
      <mesh
        material={accentMaterial}
        rotation={[0, 0, CROWN_START_ANGLE]}
        position={[0, 0, 0.135]}
      >
        <torusGeometry
          args={[CROWN_RADIUS, CROWN_INLAY_TUBE, 8, 64, CROWN_ARC]}
        />
      </mesh>
      {bandGems.map((position, i) => (
        <mesh key={i} material={glassMaterial} position={position}>
          <octahedronGeometry args={[0.045, 0]} />
        </mesh>
      ))}
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
