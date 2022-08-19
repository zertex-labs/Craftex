/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          // https://coolors.co/00cba2-00b793-00a284-007866-004f48-003a39-003031-002529-002123-001d1d
          DEFAULT: "#00cba2",
          100: "#00cba2",
          200: "#00b793",
          300: "#00a284",
          400: "#007866",
          500: "#004f48",
          600: "#003a39",
          700: "#003031",
          800: "#002529",
          900: "#002123",
          1000: "#001d1d",
        },
        gray: {
          // https://coolors.co/eaeaea-dcdddd-bfc0c1-acadaf-86888b-63666a-54575b-414449-313439-26292e
          DEFAULT: "#63666a",
          100: "#EAEAEA",
          200: "#DCDDDD",
          300: "#bfc0c1",
          400: "#acadaf",
          500: "#86888b",
          600: "#63666a",
          700: "#54575b",
          800: "#414449",
          900: "#313439",
          1000: "#26292e",
        },
        text: {
          DEFAULT: "#1F2938",
          dark: "#1F2938",
          light: "#FFFFFF",
        },
      },
    },
  },
};
