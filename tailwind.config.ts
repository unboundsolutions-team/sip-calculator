import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      colors: {
        gold: {
          DEFAULT: "#e8c56a",
          light: "#f5dfa0",
          dim: "rgba(232,197,106,0.12)",
        },
        sky: {
          DEFAULT: "#00aeef",
          calc: "#6db5e8",
          dim: "rgba(0,174,239,0.10)",
        },
        emerald: {
          calc: "#6de8a8",
          dim: "rgba(109,232,168,0.10)",
        },
        surface: {
          DEFAULT: "#161512",
          2: "#1e1c18",
          3: "#252320",
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,235,180,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,235,180,0.015) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
      },
      animation: {
        "fade-up": "fadeUp 0.4s ease both",
        "fade-in": "fadeIn 0.3s ease both",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
