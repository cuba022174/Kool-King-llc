"use client";

import { Suspense, useCallback, useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode, RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Preload } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { KoolKingLogo3D } from "./KoolKingLogo3D";

const MAX_TILT = 0.3; // radians of parallax tilt at the pointer's edge
const DAMPING = 5; // higher = the tilt catches up to the pointer faster

const BASE_CAMERA_DISTANCE = 6.2;
// The badge is ~3.2 world units wide - keep this much half-width in frame
// even on tall, narrow (mobile) viewports instead of letting it clip.
const MIN_VISIBLE_HALF_WIDTH = 1.9;

/** Pulls the camera back on narrow/tall viewports so the badge never clips. */
function ResponsiveCamera() {
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;
  const size = useThree((state) => state.size);

  useEffect(() => {
    const aspect = size.width / size.height;
    const verticalFovRad = (camera.fov * Math.PI) / 180;
    const requiredDistance =
      MIN_VISIBLE_HALF_WIDTH / (Math.tan(verticalFovRad / 2) * aspect);
    // Three.js/R3F objects (the camera included) are meant to be mutated
    // imperatively - that's the standard, performant pattern here, not a
    // violation of React's immutability rules.
    // eslint-disable-next-line react-hooks/immutability
    camera.position.z = Math.max(BASE_CAMERA_DISTANCE, requiredDistance);
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

type Pointer = { x: number; y: number };

interface ParallaxRigProps {
  pointer: RefObject<Pointer>;
  children?: ReactNode;
}

/**
 * Smoothly damps the group's rotation toward the pointer position every
 * frame - a parallax tilt layered on top of the badge's own auto-rotation.
 */
function ParallaxRig({ pointer, children }: ParallaxRigProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const targetY = pointer.current.x * MAX_TILT;
    const targetX = -pointer.current.y * MAX_TILT;
    const t = 1 - Math.exp(-DAMPING * delta); // frame-rate independent lerp

    group.rotation.y += (targetY - group.rotation.y) * t;
    group.rotation.x += (targetX - group.rotation.x) * t;
  });

  return <group ref={groupRef}>{children}</group>;
}

/**
 * The hero 3D canvas: the Kool King badge modeled and animated in 3D
 * (see KoolKingLogo3D), a pointer-tracked parallax tilt layered on top of
 * its own auto-rotation, and an optimized Bloom pass tuned to the badge's
 * snowflake and accent glow.
 *
 * The badge animates continuously, so this canvas renders every frame
 * (frameloop="always", the R3F default) rather than on demand.
 */
export function Hero3DScene() {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  const updatePointer = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    pointer.current.x = THREE.MathUtils.clamp(x, -1, 1);
    pointer.current.y = THREE.MathUtils.clamp(y, -1, 1);
  }, []);

  const resetPointer = useCallback(() => {
    pointer.current.x = 0;
    pointer.current.y = 0;
  }, []);

  return (
    <div
      className="relative h-full w-full"
      onPointerMove={updatePointer}
      onPointerLeave={resetPointer}
    >
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.1, 6.2], fov: 32 }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        {/* No scene background - the page's Matrix rain shows through. */}
        <ResponsiveCamera />
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 2]} intensity={1.4} color="#e2e8f0" />
        <pointLight position={[-2.5, -1, -2]} intensity={0.5} color="#3b82f6" />

        {/*
          Procedurally generated environment map (studio-style light panels
          captured once into a cubemap) - gives the metal real reflections
          without fetching an external HDRI file over the network, so the
          scene never depends on a third-party CDN.
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

        <Suspense fallback={null}>
          <ParallaxRig pointer={pointer}>
            <KoolKingLogo3D />
          </ParallaxRig>
        </Suspense>

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.75}
            luminanceSmoothing={0.15}
            mipmapBlur
            radius={0.5}
          />
        </EffectComposer>

        <Preload all />
      </Canvas>
    </div>
  );
}
