import Link from "next/link";
import { Mail, MapPin, PhoneCall, Snowflake } from "lucide-react";

const NAV_LINKS = [
  { href: "#technology", label: "Technology" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-obsidian/85 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-heading text-lg font-semibold text-chrome"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cryo/30 bg-cryo/10 text-cryo">
              <Snowflake className="h-5 w-5" />
            </span>
            KoolKing <span className="text-cryo">IQ</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-chrome/60">
            Smart refrigeration intelligence and private access tools, built
            by Kool King LLC for field teams that can&rsquo;t afford downtime.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-chrome/50">
            Navigate
          </h3>
          <ul className="mt-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-chrome/70 transition-colors hover:text-cryo"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-chrome/50">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-chrome/70">
            <li className="flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-cryo" />
              <a href="tel:+18005550142" className="hover:text-cryo">
                +1 (800) 555-0142
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-cryo" />
              <a href="mailto:hello@koolkingiq.com" className="hover:text-cryo">
                hello@koolkingiq.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-cryo" />
              Nationwide field service
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-chrome/40 sm:px-6 lg:px-8">
        © {year} Kool King LLC. All rights reserved.
      </div>
    </footer>
  );
}
