/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base':       '#0A0A0A',
        'bg-card':       '#111111',
        'bg-card-hover': '#161616',
        'border-dim':    'rgba(255,255,255,0.06)',
        'border-hover':  'rgba(255,255,255,0.14)',
        'text-primary':  '#F0EDE8',
        'text-muted':    '#6B6B6B',
        'text-faint':    '#3A3A3A',
        'accent':        '#C9A96E',
        'accent-dim':    'rgba(201,169,110,0.12)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body:    ['Syne', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      transitionDuration: {
        'fast': '200ms',
        'base': '400ms',
        'slow': '700ms',
      }
    },
  },
  plugins: [],
}
