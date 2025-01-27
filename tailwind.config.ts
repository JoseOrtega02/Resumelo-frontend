import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8F0E3",
        secondary:"#FFD1DC",
        accent:"#A0D8B3",
        black:"#4A4A4A",
        alternative1:"#C4B5FD",
        alternative2:"#FFE8A1",
        alternative3:"#E6D5C2"
      },
    },
  },
  plugins: [],
} satisfies Config;
