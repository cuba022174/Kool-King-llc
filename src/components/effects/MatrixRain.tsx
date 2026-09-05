"use client";

import { useEffect, useRef } from "react";

// Classic Matrix glyph soup (alphanumeric + katakana) in the brand's
// cryo-cyan / laser-blue duotone instead of green.
const CHARACTERS =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const FONT_SIZE = 16;
const FADE_ALPHA = 0.08; // lower = longer trailing streaks
const STEP_MS = 50; // glyph-update cadence - a full 60fps redraw is wasted on this effect
const RESET_CHANCE = 0.975;
const ACCENT_EVERY = 7; // every Nth column gets the laser-blue accent color

/**
 * Full-viewport Matrix-style cascading rain, fixed behind all page content.
 * Renders on a single shared <canvas>, throttled well below 60fps, paused
 * while the tab is hidden, and skipped in favor of a single static frame
 * for prefers-reduced-motion.
 */
export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      columns = Math.ceil(innerWidth / FONT_SIZE);
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * innerHeight) / FONT_SIZE) * -1,
      );

      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, innerWidth, innerHeight);
    };

    resize();

    const draw = () => {
      const { innerWidth, innerHeight } = window;

      ctx.fillStyle = `rgba(3, 7, 18, ${FADE_ALPHA})`;
      ctx.fillRect(0, 0, innerWidth, innerHeight);

      ctx.font = `${FONT_SIZE}px monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < drops.length; i++) {
        const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        const y = drops[i] * FONT_SIZE;

        // Bright leading glyph, dimmer body - the classic Matrix look.
        ctx.fillStyle = "#eafcff";
        ctx.fillText(char, i * FONT_SIZE, y);
        ctx.fillStyle = i % ACCENT_EVERY === 0 ? "#3b82f6" : "#00f0ff";
        ctx.fillText(char, i * FONT_SIZE, y - FONT_SIZE);

        if (y > innerHeight && Math.random() > RESET_CHANCE) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    if (reduceMotion) {
      // Respect the user's preference: paint one static frame, no loop.
      draw();
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }

    let rafId = 0;
    let lastStep = 0;
    let running = true;

    const tick = (time: number) => {
      if (!running) return;
      rafId = requestAnimationFrame(tick);
      if (time - lastStep < STEP_MS) return;
      lastStep = time;
      draw();
    };

    const handleVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!running) {
        running = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full opacity-40"
    />
  );
}
