const FALLBACK_SANS_FONTS = [
  "ui-sans-serif",
  "system-ui",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
  "Noto Color Emoji",
];

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury design tokens
        obsidian: "#030712",
        abyssal: {
          blue: "#060B19",
        },
        cryo: {
          cyan: "#00F0FF",
        },
        laser: {
          blue: "#3B82F6",
        },
        liquid: {
          chrome: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...FALLBACK_SANS_FONTS],
        heading: ["var(--font-outfit)", ...FALLBACK_SANS_FONTS],
      },
      backgroundImage: {
        "obsidian-gradient":
          "radial-gradient(circle at top, #060B19 0%, #030712 70%)",
      },
      boxShadow: {
        cryo: "0 0 40px rgba(0, 240, 255, 0.35)",
        laser: "0 0 40px rgba(59, 130, 246, 0.35)",
      },
    },
  },
  plugins: [],
};
