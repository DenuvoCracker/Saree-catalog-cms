/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#5E0F1E",
          dark: "#3E0A14",
          light: "#7A1729",
        },
        gold: {
          DEFAULT: "#C7A339",
          light: "#E4C766",
          dark: "#9C7E22",
        },
        cream: {
          DEFAULT: "#FBF5E9",
          dark: "#F3E9D2",
        },
        ink: "#241014",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Manrope'", "sans-serif"],
      },
      backgroundImage: {
        "zari-border":
          "linear-gradient(90deg, transparent, #C7A339 20%, #C7A339 80%, transparent)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        unfurl: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
        unfurl: "unfurl 0.8s cubic-bezier(0.65,0,0.35,1) both",
      },
    },
  },
  plugins: [],
};
