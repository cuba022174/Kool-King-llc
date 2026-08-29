export interface NavLink {
  href: string;
  label: string;
}

/** Shared between the desktop Navbar and the MobileDrawer. */
export const NAV_LINKS: NavLink[] = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#problem", label: "The Problem" },
  { href: "#pattern-engine", label: "Pattern Engine" },
  { href: "#pricing", label: "Pricing" },
];
