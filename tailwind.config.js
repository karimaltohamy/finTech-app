/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3D38ED",
        primaryMuted: "#C9C8FA",
        background: "#F5F5F5",
        dark: "#141518",
        gray: "#626D77",
        lightGray: "#D8DCE2",
      },
    },
  },
  plugins: [],
};
