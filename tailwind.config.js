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
                    DEFAULT: '#1f2a25',
                    dark: '#1a221e',
                    light: '#2e4039'
                },
                accent: '#51685f',
                muted: '#b3c3bb'
            },
            fontFamily: {
                sans: ['Poppins', 'Arial', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fade-in 1s ease-out forwards',
            },
        },
    },
    plugins: [],
}