/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#FDE3F7",
                    100: "#FAC6EF",
                    200: "#F589DE",
                    300: "#F151CE",
                    400: "#EC18BE",
                    500: "#B60F91",
                    600: "#920C75",
                    700: "#6C0957",
                    800: "#470639",
                    900: "#26031E",
                    950: "#13020F"
                }
            },
            fontSize: {
                'xxs': '0.625rem', // 10px
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
    darkMode: "class",
};