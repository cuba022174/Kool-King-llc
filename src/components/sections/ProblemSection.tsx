import { AlertTriangle, RefreshCw, UserX } from "lucide-react";

const COSTS = [
  {
    icon: RefreshCw,
    text: "Another truck roll for a problem already solved once.",
  },
  {
    icon: UserX,
    text: "A customer wondering why the same thing keeps breaking.",
  },
  {
    icon: AlertTriangle,
    text: "A technician re-diagnosing from zero, with no record to build on.",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative bg-obsidian/75 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-laser/30 bg-laser/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-laser">
            The Problem
          </div>
          <h2 className="font-heading text-3xl font-bold uppercase leading-tight tracking-tight text-chrome sm:text-4xl">
            The callback isn&rsquo;t a mystery.
            <br />
            It&rsquo;s a pattern nobody logged.
          </h2>
          <p className="mt-5 max-w-xl text-base text-chrome/60 sm:text-lg">
            A drain line gets cleared. Three months later, same unit, same
            complaint — and nobody connects the dots, because the last visit
            lives in a paper ticket or a technician&rsquo;s memory, not in
            front of whoever&rsquo;s on the job next.
          </p>
          <p className="mt-4 max-w-xl text-base font-medium text-chrome sm:text-lg">
            That&rsquo;s not a training problem. It&rsquo;s a missing-memory
            problem.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-widest text-chrome/50">
            Every unlogged pattern costs
          </p>
          <ul className="mt-5 flex flex-col gap-5">
            {COSTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-laser/30 bg-laser/10 text-laser">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm text-chrome/80 sm:text-base">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
