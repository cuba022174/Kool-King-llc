"use client";

import { motion } from "framer-motion";

/** A glowing horizontal beam that sweeps top-to-bottom in a loop, over the hero badge. */
export function ScanLine() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-[8%] h-px bg-gradient-to-r from-transparent via-cryo-cyan to-transparent shadow-[0_0_20px_4px_rgba(0,240,255,0.55)]"
      initial={{ top: "12%", opacity: 0 }}
      animate={{ top: ["12%", "88%", "12%"], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
    />
  );
}
