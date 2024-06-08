import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './modules/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        green: "#0DD983",
      },
      fontFamily: {
        uncut: ["Uncut-Sans-Regular", "sans-serif"],
        carena: ["Carena-Regular"]
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config