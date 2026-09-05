"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { scrollToId } from "@/lib/scroll";
import { LogoIcon } from "./Logo";
import { NAV_LINKS } from "./nav-links";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleMobileDrawer = useAppStore((state) => state.toggleMobileDrawer);
  const openLeadModal = useAppStore((state) => state.openLeadModal);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    scrollToId(href.slice(1));
  };

  return (
    <nav
      aria-label="Primary"
      className={`flex h-20 items-center justify-between gap-4 border-b border-white/10 bg-[#030712]/80 px-4 backdrop-blur-md transition-shadow duration-300 sm:px-6 lg:px-8 ${
        isScrolled ? "shadow-[0_8px_30px_-14px_rgba(0,240,255,0.35)]" : ""
      }`}
    >
      {/* KoolKing IQ product mark - the crown/snowflake emblem cropped
          from the Kool King LLC logo, plus the software product name. */}
      <Link href="/" className="flex shrink-0 items-center gap-2.5">
        <LogoIcon className="h-9 w-auto sm:h-10" />
        <span className="flex flex-col leading-none">
          <span className="font-heading text-base font-extrabold uppercase italic tracking-tight text-liquid-chrome sm:text-lg">
            KoolKing<span className="text-cryo-cyan">IQ</span>
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-liquid-chrome/50">
            by Kool King LLC
          </span>
        </span>
      </Link>

      {/* Desktop links */}
      <ul className="hidden items-center gap-8 md:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(event) => handleAnchorClick(event, link.href)}
              className="text-sm font-medium text-liquid-chrome/70 transition-colors hover:text-cryo-cyan"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        {/* Glowing CTA */}
        <button
          type="button"
          onClick={openLeadModal}
          className="group relative hidden overflow-hidden rounded-lg bg-gradient-to-r from-laser-blue to-cryo-cyan px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-obsidian shadow-cryo transition-transform duration-300 hover:scale-[1.03] hover:shadow-laser sm:inline-flex sm:items-center"
        >
          <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
          <span className="relative">Request Early Access</span>
        </button>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={toggleMobileDrawer}
          aria-label="Open menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-liquid-chrome transition-colors hover:border-cryo-cyan/40 hover:text-cryo-cyan md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}
