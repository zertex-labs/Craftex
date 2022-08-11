/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00a282",
          light: "#80e5d1",
          dark: "#006651",
          darker: "#00a282",
        },
      },
    },
  },
  plugins: [],
};
