import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pine: {
          DEFAULT: '#0F3D2E',
          50: '#E8F0EC',
          100: '#C9DBD1',
          200: '#9FBFAE',
          300: '#6E9C82',
          400: '#3F7A5C',
          500: '#1C5C40',
          600: '#164B34',
          700: '#0F3D2E',
          800: '#0B2E22',
          900: '#071F17',
          950: '#04140F',
        },
        gold: {
          DEFAULT: '#C9A24B',
          50: '#FBF6EA',
          100: '#F4E7C6',
          200: '#EAD59A',
          300: '#DFC26D',
          400: '#D4B159',
          500: '#C9A24B',
          600: '#AD843A',
          700: '#87652D',
          800: '#5F4720',
          900: '#3A2C14',
        },
        cream: {
          DEFAULT: '#FAF6EC',
          50: '#FFFFFF',
          100: '#FDFBF6',
          200: '#FAF6EC',
          300: '#F2EAD4',
          400: '#E7D9B4',
        },
        ink: '#1B241F',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px -12px rgba(15, 61, 46, 0.25)',
        card: '0 2px 14px -4px rgba(15, 61, 46, 0.18)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'slide-up': 'slide-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
} satisfies Config;
