/* eslint-disable import/no-anonymous-default-export */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        gray: {
          100: '#F7F7F7',
          200: '#EEEEEE',
          300: '#DDDDDD',
          400: '#929292',
          600: '#4C4C4C',
          800: '#1E1E1E',
        },
        zinc: {
          300: '#DEDEDE',
        },
        primary: '#CF202D',
        'primary-light': '#FAE9EA',
        'primary-dark': '#E63440',
        'custom-green': '#77C614',
      },
      backgroundColor: {
        'custom-gray-light': '#F7F7F7',
      },
      backgroundImage: {
        'placeholder-lg': "url('/img/placeholder.svg')",
      },
      animation: {
        skeleton: 'skeleton 1s infinite steps(10, end) alternate',
      },
      keyframes: {
        skeleton: {
          '0%': { opacity: 0.25 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
