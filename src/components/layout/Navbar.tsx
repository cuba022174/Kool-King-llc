"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, Snowflake } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const NAV_LINKS = [
  { href: "#technology", label: "Technology" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const openMobileDrawer = useAppStore((state) => state.openMobileDrawer);
  const openLeadModal = useAppStore((state) => state.openLeadModal);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo badge */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-heading text-lg font-semibold tracking-tight text-chrome"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cryo/30 bg-cryo/10 text-cryo shadow-cryo">
            <Snowflake className="h-5 w-5" strokeWidth={2} />
          </span>
          <span>
            KoolKing <span className="text-cryo">IQ</span>
          </span>
        </Link>

        {/* Desktop anchor links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-chrome/70 transition-colors hover:text-cryo"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + mobile trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openLeadModal}
            className="hidden items-center rounded-full bg-gradient-to-r from-cryo to-laser px-5 py-2.5 text-sm font-semibold text-obsidian shadow-cryo transition-transform duration-200 hover:scale-[1.03] hover:shadow-laser sm:inline-flex"
          >
            Request Private Access
          </button>

          <button
            type="button"
            onClick={openMobileDrawer}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-chrome transition-colors hover:border-cryo/40 hover:text-cryo md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </motion.header>
  );
}
