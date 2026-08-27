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
import { Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import CryoCore from "./CryoCore";

type PointerRef = MutableRefObject<{ x: number; y: number }>;

// Roughly CryoCore's entrance duration + a small buffer. Once a
// reduced-motion viewer's plate has settled there's nothing left to
// animate, so the render loop can go fully idle instead of ticking
// forever for no visible change.
const SETTLE_MS = 1500;

/**
 * The canvas uses frameloop="demand" so it stays idle by default. This
 * keeps a steady stream of frames flowing only while the hero is
 * actually on screen, lets it fall silent once scrolled away or the
 * tab is backgrounded, and — for reduced-motion viewers — stops
 * entirely once the entrance has settled since nothing else moves.
 */
function InvalidateWhileVisible({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean;
}) {
  const invalidate = useThree((state) => state.invalidate);
  const stillSettling = useRef(true);

  useEffect(() => {
    if (!reduceMotion) return;
    stillSettling.current = true;
    const timer = window.setTimeout(() => {
      stillSettling.current = false;
    }, SETTLE_MS);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useFrame(() => {
    if (!active || document.hidden) return;
    if (reduceMotion && !stillSettling.current) return;
    invalidate();
  });

  return null;
}

/** Smoothly tilts its children toward the tracked pointer position. */
function ParallaxRig({
  pointer,
  reduceMotion,
  children,
}: {
  pointer: PointerRef;
  reduceMotion: boolean;
  children: ReactNode;
}) {
  const rig = useRef<THREE.Group>(null);
  const invalidate = useThree((state) => state.invalidate);

  useFrame((_, delta) => {
    const group = rig.current;
    if (!group) return;

    // Pointer-driven parallax is exactly the kind of motion
    // prefers-reduced-motion asks us to drop — keep the plate still.
    if (reduceMotion) {
      group.rotation.set(0, 0, 0);
      return;
    }

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
  const prefersReducedMotion = useReducedMotion();

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
        camera={{ position: [0, 0, 4.4], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        {/* No opaque background fill: the canvas clears to transparent
            (gl alpha:true) so the fixed MatrixRain layer shows through
            behind the badge. */}

        {/* Procedural studio lighting — soft panels baked once into a
            small environment map, so the titanium gets real reflections
            without fetching an external HDRI. */}
        <Environment resolution={256} frames={1} background={false}>
          <Lightformer
            form="rect"
            intensity={2.4}
            color="#eaf6ff"
            position={[0, 4, 3]}
            scale={[4, 3, 1]}
          />
          <Lightformer
            form="rect"
            intensity={3.2}
            color="#00f0ff"
            position={[-4, 0.5, 1.5]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[3, 2, 1]}
          />
          <Lightformer
            form="rect"
            intensity={2.2}
            color="#3b82f6"
            position={[3.5, -1, -1.5]}
            rotation={[0, -Math.PI / 2.6, 0]}
            scale={[2.5, 2.5, 1]}
          />
        </Environment>

        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 4, 2]} intensity={1.1} color="#e2e8f0" />
        <pointLight position={[-3, -2, -2]} intensity={1} color="#00f0ff" />
        {/* Rim light from behind, so the badge separates from the
            code-rain instead of blending into it. */}
        <directionalLight position={[-1.5, -1, -4]} intensity={0.7} color="#3b82f6" />

        <Suspense fallback={null}>
          <ParallaxRig pointer={pointer} reduceMotion={Boolean(prefersReducedMotion)}>
            <CryoCore scale={1.3} reduceMotion={Boolean(prefersReducedMotion)} />
          </ParallaxRig>
        </Suspense>

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.45}
            luminanceThreshold={0.35}
            luminanceSmoothing={0.85}
            mipmapBlur
          />
        </EffectComposer>

        <InvalidateWhileVisible
          active={isVisible}
          reduceMotion={Boolean(prefersReducedMotion)}
        />
      </Canvas>
    </div>
  );
}
