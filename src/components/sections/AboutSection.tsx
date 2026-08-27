import { HardHat, Radio, Wrench, type LucideIcon } from "lucide-react";

interface Principle {
  icon: LucideIcon;
  title: string;
  description: string;
}

const PRINCIPLES: Principle[] = [
  {
    icon: HardHat,
    title: "Built by the trade, for the trade",
    description:
      "Kool King LLC is a working refrigeration and HVAC company — KoolKing IQ was built out of that field experience, not guessed at from an office.",
  },
  {
    icon: Wrench,
    title: "Technician-first, always",
    description:
      "The diagnostic engine ranks probable faults and explains why — it stays in the tech's hands instead of replacing their judgment.",
  },
  {
    icon: Radio,
    title: "Built for the field, not the office",
    description:
      "Poor signal in a basement or a rooftop unit shouldn't mean losing your work. It syncs when you're back in range.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-obsidian/75 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-start lg:px-8">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cryo/30 bg-cryo/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-cryo">
            About
          </div>
          <h2 className="font-heading text-3xl font-bold uppercase leading-tight tracking-tight text-chrome sm:text-4xl">
            Refrigeration specialists first.
            <br />
            Software second.
          </h2>
          <p className="mt-5 max-w-xl text-base text-chrome/60 sm:text-lg">
            Kool King LLC has spent its working hours in condenser closets
            and walk-in coolers, not sprint planning meetings. KoolKing IQ
            exists because the tools available to shops like ours weren&rsquo;t
            built by anyone who&rsquo;d actually turned a wrench.
          </p>
          <p className="mt-4 max-w-xl text-base text-chrome/60 sm:text-lg">
            So we built the one we wished we had — for our own crew first,
            and now for the shops that work the way we do.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.title}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cryo/30 bg-cryo/10 text-cryo">
                <principle.icon
                  className="h-5 w-5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
              <div>
                <h3 className="font-heading text-base font-semibold text-chrome">
                  {principle.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-chrome/60">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
