/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#C9AC8CED",
        dark_blue: "#152540",
        gold: "#C9AC8C",
        black2: "#191919",
        gray2: "#404040",
        persikoviy: "#C9AC8C",
      }
    },
  },
  plugins: [],
}

