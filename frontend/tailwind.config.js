import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",

  theme: {
    extend: {

      // =====================================
      // DESIGN SYSTEM COLORS (AMAZON STYLE)
      // =====================================
      colors: {
        primary: "#111827",     // main dark
        secondary: "#374151",   // text gray
        accent: "#f59e0b",      // highlights / buttons
        danger: "#ef4444",
        success: "#22c55e",
      },

      // =====================================
      // TYPOGRAPHY SYSTEM
      // =====================================
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },

      fontSize: {
        xs: ["12px", "16px"],
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        lg: ["18px", "28px"],
        xl: ["20px", "28px"],
        "2xl": ["24px", "32px"],
        "3xl": ["30px", "36px"],
      },

      // =====================================
      // SPACING SYSTEM (ECOMMERCE GRID CONTROL)
      // =====================================
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },

      // =====================================
      // BORDER RADIUS (MODERN UI)
      // =====================================
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "18px",
      },

      // =====================================
      // SHADOW SYSTEM (CARD STYLE LIKE AMAZON)
      // =====================================
      boxShadow: {
        soft: "0 2px 10px rgba(0,0,0,0.08)",
        card: "0 6px 20px rgba(0,0,0,0.12)",
        hover: "0 10px 30px rgba(0,0,0,0.15)",
      },

      // =====================================
      // RESPONSIVE BREAKPOINTS (REAL WORLD)
      // =====================================
      screens: {
        xs: "480px",
        ...defaultTheme.screens,
        "3xl": "1600px",
      },

      // =====================================
      // ANIMATION SYSTEM
      // =====================================
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },

      animation: {
        fadeIn: "fadeIn 0.3s ease-out",
        slideUp: "slideUp 0.4s ease-out",
      },

      // =====================================
      // Z-INDEX SYSTEM (MODALS, DROPDOWNS)
      // =====================================
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      }, 
    },
  },

  plugins: [],
}