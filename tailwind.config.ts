import type { Config } from "tailwindcss";
import { heroui } from "@heroui/theme";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
      "./node_modules/@heroui/theme/*.js",
    "./node_modules/@heroui/theme/dist/components/input.js",
    "./node_modules/@heroui/theme/dist/components/button.js",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "rice-cake": "#fffef2",
        "chacol-gray": "#4F4F4F",
        "onyx-black": "#3D3D3D",
      },
      boxShadow: {
        home: "0 10px 25px rgba(0, 0, 0, 0.1)",
      },
    },
    fontFamily: {
      news: ["Newsreader", "serif"],
    }
  },
  darkMode: "class",
  plugins: [heroui()],
} satisfies Config;
