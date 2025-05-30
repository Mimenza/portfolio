module.exports = {
  darkMode: "class", // Usar clase para activar el modo oscuro
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./public/html/**/*.html", // <-- Agrega esta línea para incluir tus HTMLs
  ],
  theme: {
    extend: {
      fontFamily: {
        clash: ["var(--font-clash)", "sans-serif"],
        satoshi: ["var(--font-satoshi)", "sans-serif"],
      },
      fontSize: {
        "xs-custom": "clamp(0.6rem, 1vw, 0.75rem)", // min 9.6px, max 12px
        "sm-custom": "clamp(0.7rem, 1.2vw, 0.875rem)", // min 11.2px, max 14px
        "md-custom": "clamp(0.85rem, 1.5vw, 1rem)", // min 13.6px, max 16px
        "lg-custom": "clamp(1rem, 1.8vw, 1.125rem)", // min 16px, max 18px
        "xl-custom": "clamp(1.1rem, 2vw, 1.25rem)", // min 17.6px, max 20px
        "2xl-custom": "clamp(1.3rem, 2.5vw, 1.5rem)", // min 20.8px, max 24px
        "3xl-custom": "clamp(1.5rem, 3vw, 1.875rem)", // min 24px, max 30px
        "4xl-custom": "clamp(1.8rem, 3.5vw, 2.25rem)", // min 28.8px, max 36px
        "5xl-custom": "clamp(2.4rem, 4.5vw, 3rem)", // min 38.4px, max 48px
        "6xl-custom": "clamp(3rem, 6vw, 4rem)", // min 48px, max 64px
        "7xl-custom": "clamp(4rem, 8vw, 5rem)", // min 64px, max 80px
        "8xl-custom": "clamp(5rem, 10vw, 6rem)", // min 80px, max 96px
        "9xl-custom": "clamp(6rem, 12vw, 7rem)", // min 96px, max 112px
      },
      colors: {
        background: "#FFFFFF", // fondo principal blanco
        background_light: "#F9FAFB", // fondo sutil gris claro
        secondary: "#7C3AED", // mismo tono púrpura (ligeramente ajustado para claridad)
        muted: "#c1c3c7", // gris muy claro (gray-100)
        muted_light: "#E5E7EB", // gris claro (gray-200)
        text_primary: "#111827", // gris oscuro casi negro (gray-900)
        text_secondary: "#4B5563", // gris medio (gray-600)
        text_third: "#6B7280", // gris suave (gray-500)

        // 🌑 Modo oscuro (usando clases `dark:`)
        dark: {
          background: "#0b0b0d",
          background_light: "#17171c",
          secondary: "#9333EA", // Example purple
          muted: "#17181d", // gray-700
          muted_light: "#212226", // gray-800
          text_primary: "#FFFF", // white
          text_secondary: "#9CA3AF", // gray-400
          text_third: "#D1D5DB", // gray-300
        },
      },
      animation: {
        fadeInUp: "fadeInUp 2s ease-in-out",
        fadeInDown: "fadeInDown 1s ease-in-out",
        fadeInScale: "fadeInScale 0.5s ease-in-out",
        fadeOutScale: "fadeOutScale 0.5s ease-in-out",
        float: "float 3s ease-in-out infinite",
        fadeInDownScroll: "fadeInDownScroll 2s ease-in-out infinite",
        shine: "shine 5s linear infinite",
      },
      keyframes: {
        shine: {
          "0%": { "background-position": "100%" },
          "100%": { "background-position": "-100%" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: 0, transform: "translateY(-20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInDownScroll: {
          "0%": { opacity: 1, transform: "translateY(-20px)" },
          "50%": { opacity: 0.5, transform: "translateY(0)" },
          "100%": { opacity: 0, transform: "translateY(20px)" },
        },
        fadeInScale: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        fadeOutScale: {
          "0%": { opacity: 1, transform: "scale(1)" },
          "100%": { opacity: 0, transform: "scale(0.9)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [require("taos/plugin")],
};
