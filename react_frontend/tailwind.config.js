/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          100: '#FCFCFC',
          200: '#FFDFDF',
          300: '#FFD0D0',
          400: '#FF9EAA',
          500: '#FA648A',
          600: '#E94469',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        dmserif: ['DM Serif Display', 'serif'],
        dancing: ['Dancing Script', 'cursive'],
        bebas: ['Bebas Neue', 'sans-serif'],
        Archivo: ['Archivo Black', 'sans-serif'],
        Fjalla: ['Fjalla One', 'sans-serif'],
        Lilita: ['Lilita One', 'sans-serif'],
        Yeseva: ['Yeseva One', 'sans-serif'],
      },
    },
  },
  plugins: [require('flowbite/plugin'), require('tailwindcss-animated')],
  darkMode: 'class',
}