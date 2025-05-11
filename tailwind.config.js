module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "-apple-system", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#1E40AF", // Example blue
        secondary: "#9333EA", // Example purple
        accent: "#F59E0B", // Example amber
        muted: "#374151", // gray-700
        text_primary: "#FFFF", // white
        text_secondary: "#9CA3AF", // gray-400
        text_third: "#D1D5DB", // gray-300
        
      },
      animation: {
        fadeInUp: "fadeInUp 2s ease-in-out",
        fadeInDown: "fadeInDown 1s ease-in-out",
        fadeInScale: "fadeInScale 0.5s ease-in-out",
        fadeOutScale: "fadeOutScale 0.5s ease-in-out",
        float: "float 3s ease-in-out infinite",
        fadeInDownScroll: "fadeInDownScroll 2s ease-in-out infinite",
      },
      keyframes: {
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
    },
  },
  plugins: [require('taos/plugin')],
  // safelist: [
  //   '!duration-[0ms]',
  //   '!delay-[0ms]',
  //   'html.js :where([class*="taos:"]:not(.taos-init))'
  // ],
  //  content: {
  //   relative: true,
  //   transform: (content) => content.replace(/taos:/g, ''),
  //   files: ['./src/*.{html,js}'],
  // },
};
