/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        amarillo: {
          DEFAULT: '#FFC20E',
          oscuro: '#E0A800',
          claro: '#FFF4D1',
        },
        verde: {
          DEFAULT: '#1E9E4A',
          oscuro: '#167A38',
          claro: '#E1F5E8',
        },
        rojo: {
          DEFAULT: '#D62828',
          oscuro: '#A11E1E',
          claro: '#FBE3E3',
        },
        azulo: {
          DEFAULT: '#10243E',
          claro: '#1B3A5C',
          oscuro: '#0A1A2C',
        },
        hueso: '#FAF7F0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        base: ['1.125rem', { lineHeight: '1.5rem' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.25s ease-out',
        'pop': 'pop 0.18s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.92)' },
          '60%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
