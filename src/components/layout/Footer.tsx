import { Mail, MapPin, Phone, Snowflake } from "lucide-react";
import { NAV_LINKS } from "./nav-links";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-abyssal-blue/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-laser-blue to-cryo-cyan">
              <Snowflake className="h-4 w-4 text-obsidian" strokeWidth={2.5} />
            </span>
            <span className="font-heading text-base font-semibold text-liquid-chrome">
              KoolKing<span className="text-cryo-cyan"> IQ</span>
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-liquid-chrome/60">
            Real-time field intelligence for HVAC and refrigeration crews —
            built for the truck, not the boardroom.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-liquid-chrome/80">
            Navigate
          </h3>
          <ul className="mt-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-liquid-chrome/60 transition-colors hover:text-cryo-cyan"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-liquid-chrome/80">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-liquid-chrome/60">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-cryo-cyan" />
              <a href="tel:+18005550199" className="hover:text-cryo-cyan">
                +1 (800) 555-0199
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-cryo-cyan" />
              <a
                href="mailto:hello@koolkingiq.com"
                className="hover:text-cryo-cyan"
              >
                hello@koolkingiq.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-cryo-cyan" />
              Nationwide dispatch
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-liquid-chrome/40">
          © {year} KoolKing IQ. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
