"use client";

import { useEffect, useState } from "react";
import { Activity, TrendingDown, TrendingUp, Users } from "lucide-react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

interface TelemetryState {
  jobsToday: number;
  efficiency: number;
  activeTechs: number;
  callbackRate: number;
}

const INITIAL_STATE: TelemetryState = {
  jobsToday: 128,
  efficiency: 94.2,
  activeTechs: 22,
  callbackRate: 1.8,
};

/** Nudges each metric a small, plausible amount to feel like a live feed. */
function tick(state: TelemetryState): TelemetryState {
  return {
    jobsToday: clamp(
      state.jobsToday + (Math.random() < 0.55 ? 1 : 0),
      state.jobsToday,
      260,
    ),
    efficiency: clamp(state.efficiency + (Math.random() - 0.5) * 0.6, 90, 99.4),
    activeTechs: clamp(
      Math.round(state.activeTechs + (Math.random() - 0.5) * 2),
      18,
      26,
    ),
    callbackRate: clamp(state.callbackRate + (Math.random() - 0.5) * 0.2, 1.1, 2.6),
  };
}

export default function TelemetryBar() {
  const [telemetry, setTelemetry] = useState<TelemetryState>(INITIAL_STATE);

  // Seed and update client-side only, so the server-rendered markup and
  // the first client render always agree before the feed starts moving.
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((previous) => tick(previous));
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "Jobs Today",
      value: telemetry.jobsToday.toLocaleString(),
      icon: Activity,
      trend: "up" as const,
    },
    {
      label: "Avg. Efficiency",
      value: `${telemetry.efficiency.toFixed(1)}%`,
      icon: TrendingUp,
      trend: "up" as const,
    },
    {
      label: "Active Technicians",
      value: telemetry.activeTechs.toString(),
      icon: Users,
      trend: "up" as const,
    },
    {
      label: "Callback Rate",
      value: `${telemetry.callbackRate.toFixed(1)}%`,
      icon: TrendingDown,
      trend: "down" as const,
    },
  ];

  return (
    <div className="relative border-y border-white/10 bg-abyssal/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cryo">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cryo opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cryo" />
          </span>
          Live Shop Telemetry
        </div>

        <div className="flex snap-x gap-8 overflow-x-auto sm:gap-10 sm:overflow-visible [&::-webkit-scrollbar]:hidden">
          {stats.map(({ label, value, icon: Icon, trend }) => (
            <div
              key={label}
              className="flex shrink-0 snap-start items-center gap-3"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                  trend === "up"
                    ? "border-cryo/30 bg-cryo/10 text-cryo"
                    : "border-laser/30 bg-laser/10 text-laser"
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-chrome/50">
                  {label}
                </p>
                <p className="font-heading text-xl font-semibold text-chrome tabular-nums">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
