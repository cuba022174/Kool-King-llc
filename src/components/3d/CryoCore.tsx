"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SPIKE_COUNT = 8;
const SHARD_COUNT = 6;

interface CryoCoreProps {
  /** Overall scale of the crown + lattice-core assembly. */
  scale?: number;
}

/**
 * Procedural brand mark: a titanium crown interlocked with a
 * transmissive ice-crystal lattice core. Built entirely from Three.js
 * primitives so it needs no external model assets.
 */
export default function CryoCore({ scale = 1 }: CryoCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const latticeRef = useRef<THREE.Group>(null);

  // Brushed titanium — the crown's structural material.
  const titaniumMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#c7ccd1",
        metalness: 0.95,
        roughness: 0.15,
        clearcoat: 0.4,
        clearcoatRoughness: 0.25,
        envMapIntensity: 1.2,
      }),
    [],
  );

  // Transmissive glass — the frozen core and its crystal shards.
  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#00f0ff",
        transmission: 0.9,
        ior: 1.5,
        thickness: 1.2,
        roughness: 0.05,
        metalness: 0,
        clearcoat: 1,
        envMapIntensity: 1.5,
      }),
    [],
  );

  // Radial crown spikes, evenly interlocked around the equator.
  const spikes = useMemo(
    () =>
      Array.from({ length: SPIKE_COUNT }, (_, i) => {
        const angle = (i / SPIKE_COUNT) * Math.PI * 2;
        const radius = 1.15;
        return {
          position: [
            Math.cos(angle) * radius,
            0,
            Math.sin(angle) * radius,
          ] as [number, number, number],
          rotationY: -angle + Math.PI / 2,
        };
      }),
    [],
  );

  // Ice-crystal shards that thread through the crown band.
  const shards = useMemo(
    () =>
      Array.from({ length: SHARD_COUNT }, (_, i) => {
        const angle = (i / SHARD_COUNT) * Math.PI * 2 + Math.PI / SHARD_COUNT;
        const radius = 0.75;
        return {
          position: [
            Math.cos(angle) * radius,
            Math.sin(i * 1.7) * 0.25,
            Math.sin(angle) * radius,
          ] as [number, number, number],
          rotation: [angle * 0.6, angle, angle * 0.3] as [
            number,
            number,
            number,
          ],
        };
      }),
    [],
  );

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15;
    if (wireframeRef.current) wireframeRef.current.rotation.y -= delta * 0.25;
    if (latticeRef.current) latticeRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Crown band */}
      <mesh material={titaniumMaterial} castShadow receiveShadow>
        <torusGeometry args={[1.15, 0.07, 32, 64]} />
      </mesh>

      {/* Crown spikes, interlocked around the band, each tipped with a glass jewel */}
      {spikes.map((spike, i) => (
        <group
          key={i}
          position={spike.position}
          rotation={[0, spike.rotationY, 0]}
        >
          <mesh material={titaniumMaterial} position={[0, 0.55, 0]} castShadow>
            <coneGeometry args={[0.16, 1.1, 6]} />
          </mesh>
          <mesh material={glassMaterial} position={[0, 1.15, 0]}>
            <octahedronGeometry args={[0.12, 0]} />
          </mesh>
        </group>
      ))}

      {/* Ice-crystal lattice core, interlocked through the crown */}
      <group ref={latticeRef}>
        <mesh material={glassMaterial}>
          <icosahedronGeometry args={[0.68, 1]} />
        </mesh>
        <mesh ref={wireframeRef}>
          <icosahedronGeometry args={[0.68, 1]} />
          <meshBasicMaterial
            color="#00f0ff"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
        {shards.map((shard, i) => (
          <mesh
            key={i}
            material={glassMaterial}
            position={shard.position}
            rotation={shard.rotation}
          >
            <tetrahedronGeometry args={[0.22, 0]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
