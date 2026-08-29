import Image from "next/image";
import Link from "next/link";

const LOGO_SRC = "/brand/kool-king-logo.png";
// Intrinsic dimensions of the source artwork - used for layout only,
// Next/Image serves an optimized, correctly-sized asset at runtime.
const LOGO_WIDTH = 1761;
const LOGO_HEIGHT = 893;

// A tight, unaltered crop of the same file - just the crown/snowflake
// emblem, no plate or wordmark - for compact contexts like the nav icon.
const ICON_SRC = "/brand/kool-king-icon.png";
const ICON_WIDTH = 680;
const ICON_HEIGHT = 418;

interface LogoProps {
  className?: string;
  priority?: boolean;
}

/**
 * The official Kool King LLC logo (the full plate: crown, snowflake, and
 * wordmark). Always the exact provided artwork - never a redrawn or
 * substitute mark - sized by `className` (use `h-* w-auto` so the aspect
 * ratio is preserved).
 */
export function Logo({ className = "h-10 w-auto", priority }: LogoProps) {
  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center"
      aria-label="Kool King LLC - The King of Keeping It Kool"
    >
      <Image
        src={LOGO_SRC}
        alt="Kool King LLC - The King of Keeping It Kool - Refrigeration Specialists"
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        className={className}
      />
    </Link>
  );
}

/**
 * Just the crown-and-snowflake emblem, cropped (not redrawn) from the same
 * logo file, for the compact KoolKing IQ product mark in the nav.
 */
export function LogoIcon({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <Image
      src={ICON_SRC}
      alt="Kool King LLC emblem"
      width={ICON_WIDTH}
      height={ICON_HEIGHT}
      className={`rounded-lg object-cover ${className}`}
    />
  );
}
