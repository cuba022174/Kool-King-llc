"use client";

import { useAppStore } from "@/store/useAppStore";
import { Reveal } from "@/components/motion/Reveal";

export function PricingTeaser() {
  const openLeadModal = useAppStore((state) => state.openLeadModal);

  return (
    <section
      id="pricing"
      className="border-t border-white/5 bg-abyssal-blue/30 py-20"
    >
      <div className="mx-auto max-w-2xl px-6 text-center sm:px-8">
        <Reveal>
          <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-liquid-chrome sm:text-3xl">
            One flat price per shop. No per-tech penalty for growing.
          </h2>
          <p className="mt-4 text-liquid-chrome/60">
            Early access shops lock in founder pricing for life. Details and
            tiers are being finalized with the first group of shops who join
            the waitlist.
          </p>
          <button
            type="button"
            onClick={openLeadModal}
            className="group relative mt-8 inline-flex items-center overflow-hidden rounded-lg bg-gradient-to-r from-laser-blue to-cryo-cyan px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-obsidian shadow-cryo transition-transform duration-300 hover:scale-[1.03] hover:shadow-laser"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative">Join the Waitlist</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
