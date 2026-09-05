import { Reveal } from "@/components/motion/Reveal";
import { PatternDiagram } from "./PatternDiagram";

export function PatternEngine() {
  return (
    <section id="pattern-engine" className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-widest text-cryo-cyan">
          The Signature Feature
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold uppercase tracking-tight text-liquid-chrome sm:text-4xl">
          The Diagnostic Pattern Engine
        </h2>
        <p className="mt-4 text-liquid-chrome/60">
          Every job gets logged against the unit, not just the customer. When
          a pattern shows up - three drain calls, two capacitor swaps, a
          compressor trending hot - KoolKing IQ surfaces it before the truck
          leaves the yard.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-10">
        <PatternDiagram />
      </Reveal>
    </section>
  );
}
