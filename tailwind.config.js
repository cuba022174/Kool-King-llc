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
