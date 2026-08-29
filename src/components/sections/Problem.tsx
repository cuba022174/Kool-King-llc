import { Reveal } from "@/components/motion/Reveal";

export function Problem() {
  return (
    <section
      id="problem"
      className="border-t border-white/5 bg-abyssal-blue/30 py-20"
    >
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-cryo-cyan">
            The Problem
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold uppercase tracking-tight text-liquid-chrome sm:text-4xl">
            The callback isn&rsquo;t a mystery. It&rsquo;s a pattern nobody
            logged.
          </h2>
          <p className="mt-5 text-liquid-chrome/60">
            A drain line gets cleared. Three months later, same unit, same
            complaint. Nobody connects the dots because the last visit lives
            in a paper ticket or a tech&rsquo;s memory - not in front of the
            next person on the job.
          </p>
          <p className="mt-4 text-liquid-chrome/80">
            <span className="font-semibold text-liquid-chrome">
              That&rsquo;s not a training problem. It&rsquo;s a missing-memory
              problem.
            </span>{" "}
            Every other field service tool logs the visit. None of them tell
            you what the visit means.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <div className="flex items-center justify-between px-6 py-5">
              <span className="text-liquid-chrome/70">Wasted truck roll</span>
              <span className="font-mono text-lg font-semibold text-amber-400">
                ~1.5 hrs
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
