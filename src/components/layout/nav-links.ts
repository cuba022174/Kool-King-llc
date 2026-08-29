export interface NavLink {
  href: string;
  label: string;
}

/** Shared between the desktop Navbar and the MobileDrawer. */
export const NAV_LINKS: NavLink[] = [
  { href: "#platform", label: "Platform" },
  { href: "#solutions", label: "Solutions" },
  { href: "#industries", label: "Industries" },
  { href: "#contact", label: "Contact" },
];
