/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        128: "28rem",
      },
      width: {
        128: "28rem",
        130: "30rem",
      },
      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(15px)" },
        },
      },
      screens: {
        xs: "360px",
      },
    },
  },
  plugins: [],
};
