import { Check, Snowflake } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";

const POINTS = [
  {
    icon: Check,
    title: "Flat shop pricing",
    description:
      "One price for the shop, not a tax on every tech you hire. Grow your crew without growing your software bill.",
  },
  {
    icon: Check,
    title: "Your data, always exportable",
    description:
      "Full export, any time, no cancellation runaround. It's your customer history - it stays yours.",
  },
  {
    icon: Check,
    title: "Built for the truck, not the office",
    description:
      "One-thumb logging, works offline, syncs when you're back in signal. No laptop required.",
  },
  {
    icon: Snowflake,
    title: "Built by a technician, not a boardroom",
    description:
      "Every feature exists because a real call went sideways and nobody had the answer in hand.",
  },
];

export function BuiltDifferent() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-widest text-cryo-cyan">
          Built to Fix What Other Tools Ignore
        </p>
        <h2 className="mt-3 max-w-2xl font-heading text-3xl font-bold uppercase tracking-tight text-liquid-chrome sm:text-4xl">
          The stuff every shop complains about, gone.
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
        {POINTS.map(({ icon: Icon, title, description }, index) => (
          <Reveal key={title} delay={index * 0.08}>
            <TiltCard className="h-full bg-abyssal-blue/60 p-8 [perspective:800px]">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-laser-blue to-cryo-cyan">
                <Icon className="h-5 w-5 text-obsidian" strokeWidth={2.5} />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-liquid-chrome">
                {title}
              </h3>
              <p className="mt-2 text-sm text-liquid-chrome/60">
                {description}
              </p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
