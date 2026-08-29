"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    // No backend yet - this just confirms the request was captured locally.
    setSubmitted(true);
  };

  return (
    <section className="mx-auto max-w-xl px-6 py-20 text-center sm:px-8">
      <Reveal>
        <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-liquid-chrome sm:text-4xl">
          Be one of the first shops running on it.
        </h2>
        <p className="mt-4 text-liquid-chrome/60">
          Early access is limited to a small group of HVAC &amp;
          refrigeration shops. Get in before it opens up.
        </p>

        {submitted ? (
          <div className="mt-8 flex items-center justify-center gap-2 rounded-lg border border-cryo-cyan/30 bg-cryo-cyan/10 px-5 py-4 text-cryo-cyan">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span className="text-sm font-medium">
              You&rsquo;re on the list - we&rsquo;ll be in touch.
            </span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="waitlist-email" className="sr-only">
              Work email
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@yourshop.com"
              className="w-full flex-1 rounded-lg border border-white/15 bg-abyssal-blue px-4 py-3.5 text-sm text-liquid-chrome placeholder:text-liquid-chrome/40 focus:border-cryo-cyan/50 focus:outline-none"
            />
            <button
              type="submit"
              className="group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-laser-blue to-cryo-cyan px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-obsidian shadow-cryo transition-transform duration-300 hover:scale-[1.03] hover:shadow-laser"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
              <span className="relative">Request Access</span>
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
