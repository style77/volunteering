/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "ltr-linear-infinite": "move-bg 10s linear infinite",
      },
      keyframes: {
        "move-bg": {
          "0%": { "background-position": "0 0" },
          "100%": { "background-position": "85rem 0" },
        },
      },

      colors: {
        "main-color": "#2E4583",
        "main-color-2": "#3E60C1",
        "main-color-3": "#5983FC",
        "background-color": "#EFEFEF",
        "background-color-2": "#F7F7F7",
      },
    },
  },
  plugins: [require("tailwindcss-font-inter")],
}
