/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f7fb',
          100: '#e4ebf5',
          200: '#d0dded',
          300: '#afc7e1',
          400: '#7ea1cd',
          500: '#6d8ec4',
          600: '#5977b7',
          700: '#4f66a6',
          800: '#445489',
          900: '#3b486d',
          950: '#272e44',
        },
      },
      fontSize: {
        xxs: '0.625rem', // 10px
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Noto Serif', 'serif'],
      },
      keyframes: {
        'fast-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fast-spin': 'fast-spin 0.6s linear infinite',
      },
    },
  },
  darkMode: 'class',
};
