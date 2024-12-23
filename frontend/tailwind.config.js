import tailwindScrollbarHide from "tailwind-scrollbar-hide";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindScrollbarHide],
}