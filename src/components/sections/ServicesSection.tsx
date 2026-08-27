import {
  ClipboardCheck,
  Headset,
  UploadCloud,
  Users,
  type LucideIcon,
} from "lucide-react";

interface OnboardingStep {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: OnboardingStep[] = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Guided Onboarding",
    description:
      "We configure KoolKing IQ around how your shop actually runs — dispatch, techs, and equipment types — before anyone logs a job.",
  },
  {
    number: "02",
    icon: UploadCloud,
    title: "Data Migration",
    description:
      "Bring over your existing equipment and service history so the diagnostic engine has something to learn from on day one, not month six.",
  },
  {
    number: "03",
    icon: Users,
    title: "Team Training",
    description:
      "Hands-on training for technicians and dispatch, run against your real workflow — not a generic slide deck nobody remembers.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative bg-obsidian/75 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-laser/30 bg-laser/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-laser">
            Services
          </div>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-chrome sm:text-4xl">
            Software is half the job
          </h2>
          <p className="mt-4 text-base text-chrome/60 sm:text-lg">
            Getting a shop running on KoolKing IQ is a handoff, not a
            download link. Here&rsquo;s what that looks like.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl"
            >
              <span className="font-heading text-4xl font-bold text-white/10">
                {step.number}
              </span>
              <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl border border-laser/30 bg-laser/10 text-laser">
                <step.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-heading text-lg font-semibold text-chrome">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-chrome/60">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Ongoing support — distinct from the onboarding steps above,
            since it isn't a one-time step. */}
        <div className="mt-6 flex flex-col items-start gap-5 rounded-2xl border border-cryo/20 bg-cryo/5 p-7 sm:flex-row sm:items-center">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cryo/30 bg-cryo/10 text-cryo">
            <Headset className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-chrome">
              Always-on support
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-chrome/60">
              A direct line to the team building it — not a ticket queue.
              When something&rsquo;s not working right in the field, you
              talk to someone who can actually fix it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
