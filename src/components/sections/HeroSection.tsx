"use client";

import {
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, PlayCircle, Radio } from "lucide-react";
import Hero3DScene from "@/components/3d/Hero3DScene";
import { useAppStore } from "@/store/useAppStore";

/** Reusable magnetic wrapper: nudges its child toward the pointer, then springs back. */
function Magnetic({
  strength = 0.35,
  children,
}: {
  strength?: number;
  children: ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  // The pointer-follow pull is a continuous, imperative effect —
  // MotionConfig's reducedMotion="user" only covers declarative
  // animate/transition props, so this needs its own explicit guard.
  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - (bounds.left + bounds.width / 2)) * strength);
    y.set((event.clientY - (bounds.top + bounds.height / 2)) * strength);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      className="inline-flex"
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  const openLeadModal = useAppStore((state) => state.openLeadModal);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16"
    >
      {/* 3D backdrop */}
      <div className="absolute inset-0 z-0">
        <Hero3DScene />
      </div>

      {/* Readability scrim over the canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-obsidian/35 via-obsidian/20 to-obsidian/55"
      />

      {/* Content */}
      <div className="pointer-events-none relative z-20 mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-cryo/30 bg-cryo/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-cryo"
        >
          <Radio className="h-3.5 w-3.5 animate-pulse" aria-hidden="true" />
          KoolKing IQ &middot; Private Beta
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl font-bold uppercase leading-[1.05] tracking-tight text-chrome sm:text-6xl lg:text-7xl"
        >
          Diagnose smarter.
          <br />
          Repair faster.
          <br />
          <span className="text-cryo drop-shadow-cryo">Fix it right.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-balance text-base text-chrome/70 sm:text-lg"
        >
          KoolKing IQ turns every technician into your best technician —
          AI-guided diagnostics, live equipment history, and verified repairs,
          built for HVAC and refrigeration field teams that can&rsquo;t afford
          a callback.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pointer-events-auto mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic>
            <button
              type="button"
              onClick={openLeadModal}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cryo to-laser px-7 py-3.5 text-sm font-semibold text-obsidian shadow-cryo transition-shadow duration-200 hover:shadow-laser"
            >
              Request Private Access
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </Magnetic>

          <Magnetic strength={0.25}>
            <a
              href="#technology"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-chrome backdrop-blur-md transition-colors duration-200 hover:border-cryo/40 hover:text-cryo"
            >
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              See It In Action
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
