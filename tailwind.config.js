/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          // https://coolors.co/00a282-44bba3-006651-005141
          DEFAULT: "#00a282",
          light: "#44bba3",
          dark: "#006651",
          darker: "#005141",
        },
        gray: {
          // https://coolors.co/8e9196-c5c5c5-f9f9f9-1F2938
          DEFAULT: "#8E9196",
          medium: "#C5C5C5",
          light: "#F9F9F9",
          dark: "#1F2938",
        },
      },
    },
  },
  plugins: [],
};
