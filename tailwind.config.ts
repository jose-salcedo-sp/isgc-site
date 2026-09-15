import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        tinto: "#8A1538",
        dorado: "#B08D4F",
        marfil: "#F7F4EE",
        grafito: "#262326",
        piedra: "#625D59",
        "marfil-2": "#EFEAE2",
      },
      fontFamily: {
        sans: ["var(--font-satoshi)", "Arial", "sans-serif"],
        serif: ["var(--font-satoshi)", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 16px 48px rgba(38, 35, 38, 0.10)",
      },
      borderRadius: {
        card: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
