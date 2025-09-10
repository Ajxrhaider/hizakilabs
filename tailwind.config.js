/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
         'inter': ['Inter', 'sans-serif'],
         'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
       },
    },
  },
  plugins: [],
}