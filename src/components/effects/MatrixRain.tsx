"use client";

import { useEffect, useRef } from "react";

// Refrigerant codes and HVAC/refrigeration shop-talk — stands in for
// the classic falling katakana, so the "code" reads as this brand's own.
const TERMS = [
  "R22",
  "R410A",
  "R32",
  "R134A",
  "R404A",
  "R407C",
  "R454B",
  "R290",
  "R600A",
  "R744",
  "R1234YF",
  "R508B",
  "SUPERHEAT",
  "SUBCOOLING",
  "COMPRESSOR",
  "CONDENSER",
  "EVAPORATOR",
  "SUCTION LINE",
  "LIQUID LINE",
  "HIGH SIDE",
  "LOW SIDE",
  "TXV",
  "SEER",
  "EER",
  "BTU",
  "PSI",
  "REFRIGERANT",
  "THERMOSTAT",
  "DUCTWORK",
  "CAPACITOR",
  "CONTACTOR",
  "AIRFLOW",
  "STATIC PRESSURE",
  "DELTA T",
  "HEAT PUMP",
  "CONDENSATE",
  "DRAIN LINE",
  "DISCHARGE",
  "CHARGE WEIGHT",
  "LEAK TEST",
  "VACUUM",
  "MICRONS",
  "MANIFOLD GAUGE",
  "SCHRADER VALVE",
  "EVAP COIL",
  "CONDENSER COIL",
  "BLOWER MOTOR",
  "FAN MOTOR",
  "REVERSING VALVE",
  "ACCUMULATOR",
  "RECEIVER",
  "FILTER DRIER",
  "SIGHT GLASS",
  "PRESSURE SWITCH",
  "SHORT CYCLE",
  "AMP DRAW",
  "VOLTAGE DROP",
  "KOOLKING IQ",
];

const CELL_SIZE = 20;
const FONT_SIZE = 15;
const NEON_COLORS = ["#00f0ff", "#3b82f6"]; // cryo cyan / laser blue
const TICK_MS = 70;

interface Column {
  x: number;
  row: number;
  term: string;
  charIndex: number;
  color: string;
  phase: number;
}

function pickTerm() {
  return TERMS[Math.floor(Math.random() * TERMS.length)];
}

function createColumn(x: number, startRow: number): Column {
  return {
    x,
    row: startRow,
    term: pickTerm(),
    charIndex: 0,
    color: NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)],
    phase: Math.random() * Math.PI * 2,
  };
}

/**
 * Fixed, full-viewport backdrop: HVAC/refrigeration terms and
 * refrigerant codes cascading like Matrix code-rain, in a pulsating
 * neon electric blue. Pure canvas 2D — no dependencies, cheap enough
 * to sit behind every section on the page.
 */
export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let columns: Column[] = [];
    let width = 0;
    let height = 0;
    let totalRows = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `bold ${FONT_SIZE}px ui-monospace, "Courier New", monospace`;
      ctx.textBaseline = "top";

      totalRows = Math.ceil(height / CELL_SIZE);
      const columnCount = Math.ceil(width / CELL_SIZE);
      columns = Array.from({ length: columnCount }, (_, i) =>
        createColumn(i * CELL_SIZE, Math.floor(Math.random() * -totalRows)),
      );

      ctx.fillStyle = "#030712";
      ctx.fillRect(0, 0, width, height);
    };

    resize();
    window.addEventListener("resize", resize);

    let isPaused = document.hidden;
    const onVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    let rafId = 0;
    let lastTick = 0;

    const render = (now: number) => {
      rafId = requestAnimationFrame(render);
      if (isPaused || now - lastTick < TICK_MS) return;
      lastTick = now;

      // Translucent overlay fill: erases nothing outright, just fades
      // whatever was drawn before — the classic rain trail.
      ctx.fillStyle = "rgba(3, 7, 18, 0.12)";
      ctx.fillRect(0, 0, width, height);

      const pulse = 0.7 + 0.3 * Math.sin(now / 900);

      for (const column of columns) {
        const char = column.term[column.charIndex] ?? " ";
        const y = column.row * CELL_SIZE;

        if (char !== " " && y > -CELL_SIZE && y < height + CELL_SIZE) {
          const glow = pulse * (0.65 + 0.35 * Math.sin(now / 700 + column.phase));
          ctx.shadowBlur = 9 * glow;
          ctx.shadowColor = column.color;
          ctx.fillStyle = column.color;
          ctx.globalAlpha = Math.min(1, glow * 0.85 + 0.1);
          ctx.fillText(char, column.x, y);
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;
        }

        column.row += 1;
        column.charIndex += 1;
        if (column.charIndex >= column.term.length) {
          column.charIndex = 0;
          column.term = pickTerm();
        }
        if (column.row * CELL_SIZE > height + CELL_SIZE * 4) {
          column.row = Math.floor(Math.random() * -totalRows);
        }
      }
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0"
    />
  );
}
