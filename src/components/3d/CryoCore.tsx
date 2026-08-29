"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import type { ThreeElements } from "@react-three/fiber";

// Crown band
const BAND_RADIUS = 1;
const BAND_TUBE = 0.09;

// Crown spikes (alternating tall/short, arranged procedurally around the band)
const SPIKE_COUNT = 8;
const TALL_SPIKE_HEIGHT = 0.85;
const SHORT_SPIKE_HEIGHT = 0.5;
const TALL_SPIKE_RADIUS = 0.13;
const SHORT_SPIKE_RADIUS = 0.1;
const JEWEL_RADIUS = 0.07;

// Ice-crystal lattice core
const CRYSTAL_LAYERS = 3;
const CRYSTAL_RADIUS = 0.85;

interface Spike {
  angle: number;
  height: number;
  radius: number;
  isTall: boolean;
}

function buildSpikes(): Spike[] {
  return Array.from({ length: SPIKE_COUNT }, (_, i) => {
    const isTall = i % 2 === 0;
    return {
      angle: (i / SPIKE_COUNT) * Math.PI * 2,
      height: isTall ? TALL_SPIKE_HEIGHT : SHORT_SPIKE_HEIGHT,
      radius: isTall ? TALL_SPIKE_RADIUS : SHORT_SPIKE_RADIUS,
      isTall,
    };
  });
}

interface CrystalLayer {
  rotation: [number, number, number];
  scale: number;
}

function buildCrystalLayers(): CrystalLayer[] {
  // Each layer is rotated on a different axis combination so the
  // icosahedra interlock into a faceted, star-like lattice.
  return Array.from({ length: CRYSTAL_LAYERS }, (_, i) => ({
    rotation: [
      (i * Math.PI) / CRYSTAL_LAYERS,
      (i * Math.PI) / (CRYSTAL_LAYERS * 1.5),
      (i * Math.PI) / (CRYSTAL_LAYERS * 2.5),
    ],
    scale: 1 - i * 0.16,
  }));
}

type CryoCoreProps = ThreeElements["group"];

/**
 * A procedurally generated crown interlocked with an ice-crystal lattice
 * core. Every mesh is built from primitive Three.js geometry - no external
 * model assets - and geometries/materials are shared and reused across the
 * repeated crown spikes and crystal layers.
 */
export function CryoCore(props: CryoCoreProps) {
  const spikes = useMemo(() => buildSpikes(), []);
  const crystalLayers = useMemo(() => buildCrystalLayers(), []);

  const bandGeometry = useMemo(
    () => new THREE.TorusGeometry(BAND_RADIUS, BAND_TUBE, 32, 96),
    [],
  );
  const tallSpikeGeometry = useMemo(
    () => new THREE.ConeGeometry(TALL_SPIKE_RADIUS, TALL_SPIKE_HEIGHT, 6),
    [],
  );
  const shortSpikeGeometry = useMemo(
    () => new THREE.ConeGeometry(SHORT_SPIKE_RADIUS, SHORT_SPIKE_HEIGHT, 6),
    [],
  );
  const jewelGeometry = useMemo(
    () => new THREE.OctahedronGeometry(JEWEL_RADIUS, 0),
    [],
  );
  const crystalGeometry = useMemo(
    () => new THREE.IcosahedronGeometry(CRYSTAL_RADIUS, 0),
    [],
  );

  // Brushed titanium: highly metallic, low roughness, physically based.
  const titaniumMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#cbd5e1"),
        metalness: 0.95,
        roughness: 0.15,
        clearcoat: 0.6,
        clearcoatRoughness: 0.25,
        envMapIntensity: 1.4,
      }),
    [],
  );

  // Transmissive glass: the ice-crystal lattice core.
  const iceMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#eafcff"),
        transmission: 0.9,
        ior: 1.5,
        thickness: 0.6,
        roughness: 0.05,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        envMapIntensity: 1.2,
      }),
    [],
  );

  // Glowing cryo-cyan jewels set into the tall spikes - fuel for Bloom.
  const jewelMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#00f0ff"),
        emissive: new THREE.Color("#00f0ff"),
        emissiveIntensity: 1.4,
        roughness: 0.2,
        metalness: 0.1,
        toneMapped: false,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      bandGeometry.dispose();
      tallSpikeGeometry.dispose();
      shortSpikeGeometry.dispose();
      jewelGeometry.dispose();
      crystalGeometry.dispose();
      titaniumMaterial.dispose();
      iceMaterial.dispose();
      jewelMaterial.dispose();
    };
  }, [
    bandGeometry,
    tallSpikeGeometry,
    shortSpikeGeometry,
    jewelGeometry,
    crystalGeometry,
    titaniumMaterial,
    iceMaterial,
    jewelMaterial,
  ]);

  return (
    <group {...props}>
      {/* Brushed titanium crown */}
      <group name="crown">
        <mesh
          geometry={bandGeometry}
          material={titaniumMaterial}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
          receiveShadow
        />

        {spikes.map((spike, index) => {
          const x = Math.cos(spike.angle) * BAND_RADIUS;
          const z = Math.sin(spike.angle) * BAND_RADIUS;

          return (
            <group key={index} position={[x, spike.height / 2, z]}>
              <mesh
                geometry={spike.isTall ? tallSpikeGeometry : shortSpikeGeometry}
                material={titaniumMaterial}
                castShadow
              />
              {spike.isTall && (
                <mesh
                  geometry={jewelGeometry}
                  material={jewelMaterial}
                  position={[0, spike.height / 2 + 0.08, 0]}
                />
              )}
            </group>
          );
        })}
      </group>

      {/* Ice-crystal lattice core, interlocked at the crown's center */}
      <group name="crystal-core">
        {crystalLayers.map((layer, index) => (
          <mesh
            key={index}
            geometry={crystalGeometry}
            material={iceMaterial}
            rotation={layer.rotation}
            scale={layer.scale}
          />
        ))}
        <pointLight color="#00f0ff" intensity={2.2} distance={2.6} decay={2} />
      </group>
    </group>
  );
}
