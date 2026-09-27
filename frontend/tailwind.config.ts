import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        "ink-raised": "rgb(var(--color-ink-raised) / <alpha-value>)",
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        slate: "rgb(var(--color-slate) / <alpha-value>)",
        blue: "rgb(var(--color-blue) / <alpha-value>)",
        "blue-dim": "rgb(var(--color-blue-dim) / <alpha-value>)",
        violet: "rgb(var(--color-violet) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        coral: "rgb(var(--color-coral) / <alpha-value>)",
        "coral-dim": "rgb(var(--color-coral-dim) / <alpha-value>)",
        teal: "rgb(var(--color-teal) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;