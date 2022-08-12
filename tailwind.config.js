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
          // https://coolors.co/f9f9f9-dcdddd-bfc0c1-acadaf-86888b-63666a-54575b-414449-313439-26292e
          100: "#f9f9f9",
          200: "##EBEBEB",
          300: "#bfc0c1",
          400: "#acadaf",
          500: "#86888b",
          600: "#63666a",
          700: "#54575b",
          800: "#414449",
          900: "#313439",
          1000: "#26292e",
        },
      },
    },
  },
  plugins: [],
};
