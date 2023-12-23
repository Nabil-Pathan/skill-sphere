/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
    },
  },

  variants: {
    extend: {
      display: ['responsive', 'group-hover', 'group-focus', 'focus', 'hover'],
    },
  },
  plugins: [],
}