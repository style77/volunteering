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
        "purple-100": "#F3E8FF",
        "purple-200": "#E5D0FE",
        "purple-300": "#CABAFE",
        "purple-400": "#B197FC",
        "purple-500": "#9775FA",
        "purple-600": "#845EF7",
        "purple-700": "#7950F2",
        "purple-800": "#7048E8",
        "purple-900": "#6741D9",
        
        "gold-100": "#FFFBEA",
        "gold-200": "#FFF3C4",
        "gold-300": "#FCE588",
        "gold-400": "#FADB5F",
        "gold-500": "#F7C948",
        "gold-600": "#F0B429",
        "gold-700": "#DE911D",
        "gold-800": "#CB6E17",
        "gold-900": "#B44D12",

        "green-100": "#E3F9E5",
        "green-200": "#C1F2C7",
        "green-300": "#91E697",
        "green-400": "#51CA58",
        "green-500": "#31B237",
        "green-600": "#18981D",
        "green-700": "#0F8613",
        "green-800": "#0E7817",
        "green-900": "#07600E",

        "sky-100": "#E1F5FE",
        "sky-200": "#B3E5FC",
        "sky-300": "#81D4FA",
        "sky-400": "#4FC3F7",
        "sky-500": "#29B6F6",
        "sky-600": "#03A9F4",
        "sky-700": "#039BE5",
        "sky-800": "#0288D1",
        "sky-900": "#0277BD",

        // These are only used for badges tbh ^^

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
