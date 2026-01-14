/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Backgrounds
                'bg-deep': '#050505',
                'bg-card': 'rgba(20, 20, 20, 0.6)',

                // Text
                'text-primary': '#EDEDED',
                'text-secondary': '#888888',

                // Accents (The Neon Palette)
                'accent-blue': '#00F0FF',
                'accent-green': '#00FF94',
                'accent-purple': '#BC13FE',
                'accent-orange': '#FFAB00',

                // Tactical Colors
                'tactical-cyan': '#22d3ee',
                'tactical-emerald': '#10b981',
                'tactical-amber': '#f59e0b',

                // UI Utilities
                'border-subtle': 'rgba(255, 255, 255, 0.08)',
                'glass-overlay': 'rgba(255, 255, 255, 0.03)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
                display: ['Space Grotesk', 'system-ui', 'sans-serif'],
                hitmarker: ['Chakra Petch', 'system-ui', 'sans-serif'],
            },
            animation: {
                'scan': 'scan 3s linear infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
            },
            keyframes: {
                scan: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                },
                fadeIn: {
                    'from': { opacity: '0' },
                    'to': { opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
