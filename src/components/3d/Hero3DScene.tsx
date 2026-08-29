"use client";

import { useCallback, useRef } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode, RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { RootState } from "@react-three/fiber";
import { Environment, Lightformer, Preload } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { CryoCore } from "./CryoCore";

const MAX_TILT = 0.35; // radians of parallax tilt at the pointer's edge
const DAMPING = 6; // higher = the tilt catches up to the pointer faster
const SETTLE_EPSILON = 0.0005; // stop re-rendering once the tilt is this close

type Pointer = { x: number; y: number };

interface ParallaxRigProps {
  pointer: RefObject<Pointer>;
  children?: ReactNode;
}

/**
 * Smoothly damps toward the pointer-driven tilt target every frame, and
 * keeps requesting new frames (via invalidate) only while it's still
 * moving - once it settles, rendering stops, which is the whole point of
 * running the canvas in frameloop="demand".
 */
function ParallaxRig({ pointer, children }: ParallaxRigProps) {
  const groupRef = useRef<THREE.Group>(null);
  const invalidate = useThree((state) => state.invalidate);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const targetY = pointer.current.x * MAX_TILT;
    const targetX = -pointer.current.y * MAX_TILT;
    const t = 1 - Math.exp(-DAMPING * delta); // frame-rate independent lerp

    group.rotation.y += (targetY - group.rotation.y) * t;
    group.rotation.x += (targetX - group.rotation.x) * t;

    const remaining =
      Math.abs(targetY - group.rotation.y) + Math.abs(targetX - group.rotation.x);

    if (remaining > SETTLE_EPSILON) {
      invalidate();
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

/**
 * The hero 3D canvas: a demand-driven render loop (renders only when
 * something actually changes), a pointer-tracked parallax tilt on the
 * CryoCore, and an optimized Bloom pass tuned to catch just the crown's
 * jewels and the crystal core's glow.
 */
export function Hero3DScene() {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const invalidateRef = useRef<RootState["invalidate"] | null>(null);

  const updatePointer = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;

    pointer.current.x = THREE.MathUtils.clamp(x, -1, 1);
    pointer.current.y = THREE.MathUtils.clamp(y, -1, 1);
    invalidateRef.current?.();
  }, []);

  const resetPointer = useCallback(() => {
    pointer.current.x = 0;
    pointer.current.y = 0;
    invalidateRef.current?.();
  }, []);

  return (
    <div
      className="relative h-full w-full"
      onPointerMove={updatePointer}
      onPointerLeave={resetPointer}
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        shadows
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.6, 5.6], fov: 32 }}
        onCreated={({ invalidate }) => {
          invalidateRef.current = invalidate;
        }}
      >
        <color attach="background" args={["#030712"]} />

        <ambientLight intensity={0.4} />
        <directionalLight
          position={[3, 4, 2]}
          intensity={1.6}
          color="#e2e8f0"
          castShadow
        />
        <pointLight position={[-2.5, -1, -2]} intensity={0.5} color="#3b82f6" />

        {/*
          Procedurally generated environment map (studio-style light panels
          captured once into a cubemap) - gives the titanium crown real
          reflections without fetching an external HDRI file over the
          network, so the scene never depends on a third-party CDN.
        */}
        <Environment resolution={256} frames={1}>
          <Lightformer
            form="rect"
            intensity={6}
            color="#f8fafc"
            position={[0, 4, 2]}
            scale={[6, 3, 1]}
          />
          <Lightformer
            form="rect"
            intensity={3}
            color="#f8fafc"
            position={[0, -3, 3]}
            scale={[5, 2, 1]}
          />
          <Lightformer
            form="rect"
            intensity={1.4}
            color="#00f0ff"
            position={[-4, 1, 3]}
            scale={[3, 3, 1]}
          />
          <Lightformer
            form="rect"
            intensity={1.4}
            color="#3b82f6"
            position={[4, -1, -3]}
            rotation={[0, Math.PI, 0]}
            scale={[3, 3, 1]}
          />
        </Environment>

        <ParallaxRig pointer={pointer}>
          <CryoCore />
        </ParallaxRig>

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.2}
            mipmapBlur
            radius={0.7}
          />
        </EffectComposer>

        <Preload all />
      </Canvas>
    </div>
  );
}
