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
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Luxury design tokens
        obsidian: "#030712",
        abyssal: "#060B19",
        cryo: "#00F0FF",
        laser: "#3B82F6",
        chrome: "#E2E8F0",
      },
      backgroundColor: {
        obsidian: "#030712",
        abyssal: "#060B19",
      },
      textColor: {
        cryo: "#00F0FF",
        laser: "#3B82F6",
        chrome: "#E2E8F0",
      },
      boxShadow: {
        cryo: "0 0 20px rgba(0, 240, 255, 0.35)",
        laser: "0 0 20px rgba(59, 130, 246, 0.35)",
      },
      dropShadow: {
        cryo: "0 0 12px rgba(0, 240, 255, 0.6)",
        laser: "0 0 12px rgba(59, 130, 246, 0.6)",
      },
    },
  },
  plugins: [],
};
