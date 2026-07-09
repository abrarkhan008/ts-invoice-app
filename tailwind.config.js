/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        invoice: {
          navy: "#1a2f5c",
          navyDark: "#0f1e3d",
          line: "#2c4a8a",
          paper: "#fefdfb",
          red: "#c0392b",
        },
      },
      fontFamily: {
        serif: ["Georgia", "'Times New Roman'", "serif"],
      },
    },
  },
  plugins: [],
};
