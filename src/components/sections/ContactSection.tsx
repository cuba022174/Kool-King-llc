"use client";

import { ArrowRight, Mail, PhoneCall } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const CHANNELS = [
  {
    icon: PhoneCall,
    label: "Call or text",
    value: "(678) 391-9779",
    href: "tel:+16783919779",
  },
  {
    icon: Mail,
    label: "Email",
    value: "ricardo@kool-king-llc.com",
    href: "mailto:ricardo@kool-king-llc.com",
  },
];

export default function ContactSection() {
  const openLeadModal = useAppStore((state) => state.openLeadModal);

  return (
    <section id="contact" className="relative bg-obsidian/75 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cryo/30 bg-cryo/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-cryo">
            Contact
          </div>
          <h2 className="font-heading text-3xl font-bold uppercase leading-tight tracking-tight text-chrome sm:text-4xl">
            Talk to the team
            <br />
            building it.
          </h2>
          <p className="mt-5 max-w-lg text-base text-chrome/60 sm:text-lg">
            Whether you&rsquo;re ready to request access or just want to know
            if KoolKing IQ fits how your shop runs, you&rsquo;re reaching the
            people building it directly — not a call center.
          </p>

          <button
            type="button"
            onClick={openLeadModal}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cryo to-laser px-7 py-3.5 text-sm font-semibold text-obsidian shadow-cryo transition-shadow duration-200 hover:shadow-laser"
          >
            Request Private Access
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-widest text-chrome/50">
            Prefer to talk first?
          </p>
          <ul className="mt-5 flex flex-col gap-4">
            {CHANNELS.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-cryo/40"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cryo/30 bg-cryo/10 text-cryo">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-chrome/50">
                      {label}
                    </span>
                    <span className="block text-base font-medium text-chrome">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
