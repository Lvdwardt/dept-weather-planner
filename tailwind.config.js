/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dept: {
          50: "#F5F5F5",
          100: "#E9E9E9",
          200: "#D9D9D9",
          300: "#C4C4C4",
          400: "#9D9D9D",
          900: "#000000",
        },
        primary: "#5115F7",
        secondary: "#F0EBFE",
      },
      fontFamily: {
        sans: ["var(--font-lato)"],
      },
    },
  },
  plugins: [],
};
