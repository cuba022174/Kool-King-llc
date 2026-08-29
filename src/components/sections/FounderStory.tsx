import { Logo } from "@/components/layout/Logo";
import { Reveal } from "@/components/motion/Reveal";

export function FounderStory() {
  return (
    <section className="border-t border-white/5 bg-abyssal-blue/30 py-20">
      <div className="mx-auto max-w-2xl px-6 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-obsidian/60 px-8 py-10 text-center">
            <Logo className="h-24 w-auto sm:h-28" />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-liquid-chrome/50">
              Acworth, GA
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-cryo-cyan">
            Founder Story
          </p>
          <blockquote className="mt-4 text-center text-lg leading-relaxed text-liquid-chrome/80">
            &ldquo;I spent 15 years with the same company doing commercial
            refrigeration and residential HVAC - then the pandemic hit and
            that job was gone. I sent out over a hundred applications and
            heard almost nothing back.{" "}
            <span className="text-cryo-cyan">
              KoolKing IQ is what I built instead
            </span>{" "}
            - the tool I wish every shop I ever worked for had handed me on
            day one.&rdquo;
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
