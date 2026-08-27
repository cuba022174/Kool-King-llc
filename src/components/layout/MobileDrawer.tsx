"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, PhoneCall, Snowflake, Wrench, X } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const NAV_LINKS = [
  { href: "#technology", label: "Technology" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

// Large, glove-friendly shortcuts for technicians in the field.
const QUICK_ACTIONS = [
  { href: "tel:+18005550142", label: "Call Dispatch", icon: PhoneCall },
  { href: "#service-areas", label: "Service Areas", icon: MapPin },
  { href: "#technology", label: "Diagnostics", icon: Wrench },
];

export default function MobileDrawer() {
  const isOpen = useAppStore((state) => state.isMobileDrawerOpen);
  const closeMobileDrawer = useAppStore((state) => state.closeMobileDrawer);
  const openLeadModal = useAppStore((state) => state.openLeadModal);

  // Lock body scroll and allow Escape to dismiss while the drawer is open.
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

  const handleNavigate = () => closeMobileDrawer();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMobileDrawer}
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-obsidian/70 backdrop-blur-sm"
          />

          <motion.aside
            key="drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col border-l border-white/10 bg-abyssal/95 backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <span className="flex items-center gap-2.5 font-heading text-base font-semibold text-chrome">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cryo/30 bg-cryo/10 text-cryo">
                  <Snowflake className="h-5 w-5" />
                </span>
                KoolKing <span className="text-cryo">IQ</span>
              </span>
              <button
                type="button"
                onClick={closeMobileDrawer}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-chrome/80 transition-colors hover:border-cryo/40 hover:text-cryo"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Large tap targets sized for gloved hands in the field. */}
            <div className="grid grid-cols-3 gap-2 border-b border-white/10 px-4 py-4">
              {QUICK_ACTIONS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  onClick={handleNavigate}
                  className="flex min-h-[76px] flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center text-xs font-medium text-chrome/80 transition-colors active:border-cryo/40 active:text-cryo"
                >
                  <Icon className="h-6 w-6" />
                  {label}
                </a>
              ))}
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={handleNavigate}
                      className="flex min-h-[56px] items-center rounded-lg px-3 text-lg font-medium text-chrome transition-colors active:bg-white/5 active:text-cryo"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-white/10 px-4 py-5">
              <button
                type="button"
                onClick={() => {
                  closeMobileDrawer();
                  openLeadModal();
                }}
                className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cryo to-laser px-5 py-4 text-base font-semibold text-obsidian shadow-cryo transition-transform active:scale-[0.98]"
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
