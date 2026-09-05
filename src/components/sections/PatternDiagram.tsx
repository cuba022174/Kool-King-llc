"use client";

import { motion } from "framer-motion";

/**
 * An abstract visualization of the pattern engine connecting data points
 * across visits - illustrative, not a literal product screenshot.
 */
export function PatternDiagram() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-abyssal-blue/60">
      <div className="h-1 bg-gradient-to-r from-transparent via-cryo-cyan to-transparent" />
      <div className="p-8 sm:p-10">
        <svg viewBox="0 0 400 220" className="w-full" role="presentation">
          <rect
            x="10"
            y="10"
            width="380"
            height="200"
            rx="10"
            fill="none"
            stroke="rgba(226,232,240,0.15)"
          />
          <rect
            x="280"
            y="30"
            width="90"
            height="34"
            rx="6"
            fill="none"
            stroke="#00F0FF"
            strokeWidth="1.5"
          />
          <line x1="10" y1="90" x2="390" y2="90" stroke="rgba(226,232,240,0.1)" />
          <line x1="10" y1="150" x2="390" y2="150" stroke="rgba(226,232,240,0.1)" />

          <motion.line
            x1="70"
            y1="115"
            x2="200"
            y2="175"
            stroke="#00F0FF"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          <circle cx="70" cy="115" r="18" fill="none" stroke="#00F0FF" strokeWidth="2" />
          <circle cx="200" cy="175" r="12" fill="#00F0FF" fillOpacity="0.15" stroke="#00F0FF" strokeWidth="2" />

          <motion.circle
            cx="200"
            cy="175"
            r="12"
            fill="none"
            stroke="#00F0FF"
            strokeWidth="2"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "200px 175px" }}
          />
        </svg>
      </div>
    </div>
  );
}
