/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'josef': ['josefin Sans', 'sans-serif',],
      },
      color: {
        'primary':  ['#f029cb'],
        'secondery': ['#621fab'],
      },
      boxShadow: {
        '13xl': '0 35px 60px -15px RGB(176, 114, 184)',
      }
    },
  },
  plugins: [],
}

