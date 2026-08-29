import Image from "next/image";
import Link from "next/link";

const LOGO_SRC = "/brand/kool-king-logo.png";
// Intrinsic dimensions of the source artwork - used for layout only,
// Next/Image serves an optimized, correctly-sized asset at runtime.
const LOGO_WIDTH = 1761;
const LOGO_HEIGHT = 893;

interface LogoProps {
  className?: string;
  priority?: boolean;
}

/**
 * The official Kool King LLC logo. Always the exact provided artwork -
 * never a redrawn or substitute mark - sized by `className` (use
 * `h-* w-auto` so the aspect ratio is preserved).
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
