"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type PointerEvent,
  type ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import CryoCore from "./CryoCore";

type PointerRef = MutableRefObject<{ x: number; y: number }>;

/**
 * The canvas uses frameloop="demand" so it stays idle by default. This
 * keeps a steady stream of frames flowing only while the hero is
 * actually on screen, and lets it fall silent once scrolled away.
 */
function InvalidateWhileVisible({ active }: { active: boolean }) {
  const invalidate = useThree((state) => state.invalidate);

  useFrame(() => {
    if (active) invalidate();
  });

  return null;
}

/** Smoothly tilts its children toward the tracked pointer position. */
function ParallaxRig({
  pointer,
  children,
}: {
  pointer: PointerRef;
  children: ReactNode;
}) {
  const rig = useRef<THREE.Group>(null);
  const invalidate = useThree((state) => state.invalidate);

  useFrame((_, delta) => {
    const group = rig.current;
    if (!group) return;

    const targetY = pointer.current.x * 0.5;
    const targetX = pointer.current.y * -0.3;
    // Framerate-independent damping factor, so the tilt feels the same
    // regardless of the (irregular) delta a demand frameloop produces.
    const damping = 1 - Math.pow(0.001, delta);

    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetY, damping);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetX, damping);

    // Keep requesting frames only while the tilt is still settling.
    if (
      Math.abs(group.rotation.y - targetY) > 0.0005 ||
      Math.abs(group.rotation.x - targetX) > 0.0005
    ) {
      invalidate();
    }
  });

  return <group ref={rig}>{children}</group>;
}

export default function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Only spend GPU time on the demand frameloop while the hero is in view.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      y: ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
    };
  }, []);

  const handlePointerLeave = useCallback(() => {
    pointer.current = { x: 0, y: 0 };
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative h-[70vh] min-h-[480px] w-full"
    >
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        camera={{ position: [0, 0.4, 4.2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#030712"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={1.4} color="#e2e8f0" />
        <pointLight position={[-3, -2, -2]} intensity={1.2} color="#00f0ff" />

        <Suspense fallback={null}>
          <ParallaxRig pointer={pointer}>
            <CryoCore scale={1.1} />
          </ParallaxRig>
        </Suspense>

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.65}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>

        <InvalidateWhileVisible active={isVisible} />
      </Canvas>
    </div>
  );
}
