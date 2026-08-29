"use client";

import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

const SPRING = { stiffness: 150, damping: 20 };
const TILT_DEGREES = 9;

/** Wraps content in a subtle 3D tilt that follows the pointer, and springs back to flat on leave. */
export function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(
    useTransform(y, [0, 1], [TILT_DEGREES, -TILT_DEGREES]),
    SPRING,
  );
  const rotateY = useSpring(
    useTransform(x, [0, 1], [-TILT_DEGREES, TILT_DEGREES]),
    SPRING,
  );

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    x.set((event.clientX - bounds.left) / bounds.width);
    y.set((event.clientY - bounds.top) / bounds.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
