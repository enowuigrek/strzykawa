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
                    DEFAULT: '#1E2A25',
                    light: '#2C3A35',
                    dark: '#141C18',
                },
                accent: '#6B7F73',
                muted: '#9CA8A1',
                success: {
                    DEFAULT: '#0E8C6F',
                    dark: '#0B6F55',
                },
                danger: {
                    DEFAULT: '#C9423A',
                    dark: '#A7322D',
                },
                badge: {
                    blue: '#7A8FA6',
                    orange: '#C48F62',
                },
                cta: {
                    DEFAULT: '#3A5F55',
                    hover: '#2F4F46',
                },
            },
            fontFamily: {
                sans: ['Dosis', 'Arial', 'sans-serif']
            },
            backdropBlur: {
                xs: '2px'
            },
            animation: {
                'fade-in': 'fadeIn 1s ease-out forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'fadeIn': 'fadeInSimple 0.5s ease-in-out',
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
                },
                fadeInSimple: {
                    '0%': {
                        opacity: '0'
                    },
                    '100%': {
                        opacity: '1'
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
        require('tailwind-scrollbar-hide'),
    ],
}