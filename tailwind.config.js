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
                    light: '#2a3630',
                    dark: '#151e1a'
                },
                accent: '#51685f',
                muted: '#8a9d94'
            },
            fontFamily: {
                sans: ['Poppins', 'Arial', 'sans-serif']
            },
            backdropBlur: {
                xs: '2px'
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-out forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(20px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                }
            },
            screens: {
                '3xl': '1600px'
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}