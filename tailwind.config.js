/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pl-purple': '#37003c',
        'pl-light-purple': '#c5b0d5',
        'pl-white': '#ffffff',
        'pl-black': '#000000',
        'pl-grey': '#e5e5e5',
      },
      fontFamily: {
        header: ['Raleway', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
