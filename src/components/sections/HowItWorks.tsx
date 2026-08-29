import { Reveal } from "@/components/motion/Reveal";

const STEPS = [
  {
    title: "Every visit becomes structured data",
    description:
      "Photos, parts, symptoms, and readings attach to the equipment record - not a paper ticket that lives in a truck.",
  },
  {
    title: "The engine watches for repeats",
    description:
      "Repeat symptoms, part swaps, or trending readings on the same unit trigger a flag - automatically, no extra logging required.",
  },
  {
    title: "Your tech sees it before the door",
    description:
      'The dispatch note doesn’t just say "AC not cooling" - it says what’s happened here before, and what to check first.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
      <ol className="space-y-10">
        {STEPS.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.1}>
            <li className="flex items-start gap-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cryo-cyan/40 text-sm font-bold text-cryo-cyan">
                {index + 1}
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold text-liquid-chrome">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-liquid-chrome/60">{step.description}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
