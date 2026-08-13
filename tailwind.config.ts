import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: "#0E4B3C",
          light: "#1B6E56",
          dark: "#092E25",
        },
        cream: {
          DEFAULT: "#F8F3EA",
          dark: "#EFE6D3",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E8C766",
          dark: "#A6832A",
        },
        ink: "#14231D",
      },

      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        accent: ["var(--font-accent)", "cursive"],
      },

      boxShadow: {
        soft: "0 20px 60px -15px rgba(14, 75, 60, 0.25)",
        card: "0 10px 40px -10px rgba(14, 75, 60, 0.18)",
        gold: "0 8px 30px -8px rgba(212, 175, 55, 0.45)",
      },

      backgroundImage: {
        "emerald-radial":
          "radial-gradient(120% 120% at 20% 0%, #145C49 0%, #0E4B3C 45%, #092E25 100%)",

        "gold-sheen":
          "linear-gradient(115deg, #A6832A 0%, #E8C766 35%, #D4AF37 55%, #A6832A 100%)",
      },

      keyframes: {
        marquee: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },

        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-14px)",
          },
        },

        "drift-slow": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },

        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(24px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        shimmer: {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "100%": {
            backgroundPosition: "200% 50%",
          },
        },
      },

      animation: {
        marquee: "marquee 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        "drift-slow": "drift-slow 40s linear infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },

  plugins: [],
};

export default config; 