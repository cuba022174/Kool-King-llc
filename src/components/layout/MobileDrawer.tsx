"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Snowflake, X } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { scrollToId } from "@/lib/scroll";
import { NAV_LINKS } from "./nav-links";

const DISPATCH_PHONE_DISPLAY = "+1 (800) 555-0199";
const DISPATCH_PHONE_TEL = "+18005550199";

/**
 * Slide-over navigation panel for small screens.
 *
 * Optimized for field technicians: large, thumb-friendly tap targets, a
 * one-tap "call dispatch" action up top, high-contrast text for outdoor
 * glare, and safe-area padding so the bottom CTA clears notches/home bars.
 */
export function MobileDrawer() {
  const isOpen = useAppStore((state) => state.isMobileDrawerOpen);
  const closeMobileDrawer = useAppStore((state) => state.closeMobileDrawer);
  const openLeadModal = useAppStore((state) => state.openLeadModal);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileDrawer();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeMobileDrawer]);

  const handleNavClick = (href: string) => {
    closeMobileDrawer();
    if (!href.startsWith("#")) return;
    // Let the close animation start before the page scrolls.
    window.setTimeout(() => scrollToId(href.slice(1)), 150);
  };

  const handleRequestAccess = () => {
    closeMobileDrawer();
    openLeadModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="mobile-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMobileDrawer}
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-obsidian/70 backdrop-blur-sm md:hidden"
          />

          <motion.aside
            key="mobile-drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[60] flex w-[88vw] max-w-sm flex-col border-l border-white/10 bg-abyssal-blue shadow-2xl md:hidden"
          >
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-5">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-laser-blue to-cryo-cyan">
                  <Snowflake className="h-4 w-4 text-obsidian" strokeWidth={2.5} />
                </span>
                <span className="font-heading text-base font-semibold text-liquid-chrome">
                  KoolKing<span className="text-cryo-cyan"> IQ</span>
                </span>
              </div>
              <button
                type="button"
                onClick={closeMobileDrawer}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-liquid-chrome active:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* One-tap dispatch call - built for gloved, one-thumb use */}
            <a
              href={`tel:${DISPATCH_PHONE_TEL}`}
              className="mx-5 mt-5 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-laser-blue to-cryo-cyan px-5 py-4 text-base font-semibold text-obsidian shadow-cryo active:scale-[0.98]"
            >
              <Phone className="h-5 w-5" />
              Call Dispatch: {DISPATCH_PHONE_DISPLAY}
            </a>

            <nav
              aria-label="Mobile"
              className="mt-2 flex-1 overflow-y-auto px-2 py-4"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(event) => {
                        event.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className="block rounded-xl px-4 py-4 text-lg font-medium text-liquid-chrome/90 transition-colors active:bg-white/5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="shrink-0 border-t border-white/10 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
              <button
                type="button"
                onClick={handleRequestAccess}
                className="w-full rounded-2xl bg-gradient-to-r from-laser-blue to-cryo-cyan px-5 py-4 text-base font-semibold text-obsidian shadow-cryo active:scale-[0.98]"
              >
                Request Private Access
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
