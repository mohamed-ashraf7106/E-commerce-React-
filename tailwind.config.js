/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        shop: "#feee00",
        category: "#fcfbf4",
      },
      boxShadow: { 'hard-blur-white': '0 0 20px 25px rgba(255, 255, 255, 0.9)', },
      spacing: {
        128: "1170px",
        51:"50%"
      },
    },
  },
  plugins: [],
};
