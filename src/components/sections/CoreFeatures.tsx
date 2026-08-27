"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  GraduationCap,
  Mic,
  ScanSearch,
  ShieldCheck,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: ScanSearch,
    title: "Diagnostic Copilot",
    description:
      "AI-guided fault trees turn symptoms into a confirmed root cause in minutes, not hours.",
  },
  {
    icon: Cpu,
    title: "Equipment Digital Twin",
    description:
      "A live model of every unit's history, parts, and performance — pulled up before you open the panel.",
  },
  {
    icon: Warehouse,
    title: "Smart Inventory",
    description:
      "Real-time truck and warehouse stock synced to every job, so the right part is already staged.",
  },
  {
    icon: Mic,
    title: "Voice Workflow",
    description:
      "Log findings, parts, and time hands-free — built for technicians working with gloves on.",
  },
  {
    icon: ShieldCheck,
    title: "Repair Verification",
    description:
      "Every fix is checked against spec before the ticket closes, cutting callbacks at the source.",
  },
  {
    icon: GraduationCap,
    title: "Training Hub",
    description:
      "Bite-sized certification paths keep every tech current on new equipment and refrigerants.",
  },
];

export default function CoreFeatures() {
  return (
    <section id="technology" className="relative bg-obsidian py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-chrome sm:text-4xl">
            One platform, every step of the job
          </h2>
          <p className="mt-4 text-base text-chrome/60 sm:text-lg">
            KoolKing IQ replaces six disconnected tools with a single system
            built around the technician.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-colors duration-300 hover:border-cryo/40 hover:shadow-cryo"
            >
              {/* Corner glow revealed on hover */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cryo/0 blur-3xl transition-colors duration-300 group-hover:bg-cryo/20"
              />

              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-cryo/30 bg-cryo/10 text-cryo">
                <feature.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>

              <h3 className="relative mt-5 font-heading text-lg font-semibold text-chrome">
                {feature.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-chrome/60">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
