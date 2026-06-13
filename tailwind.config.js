/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        xs: '430px'
      },
      colors: {
        forest: {
          50: '#eef6f0',
          100: '#d6e9db',
          200: '#a9d0b5',
          300: '#74b187',
          400: '#458a5f',
          500: '#2d6b45',
          600: '#1B4332',
          700: '#163a2a',
          800: '#102b20',
          900: '#0a1c15',
          950: '#06120d'
        },
        gold: {
          50: '#fbf6e9',
          100: '#f5e9c4',
          200: '#ecd385',
          300: '#e2bd49',
          400: '#D4A017',
          500: '#b88712',
          600: '#94690f',
          700: '#704f0e',
          800: '#4f3909',
          900: '#332506'
        },
        sand: {
          50: '#fdfbf6',
          100: '#f8f2e4',
          200: '#f1e6cd',
          300: '#e7d4ac',
          400: '#dabb82'
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.18)',
        gold: '0 10px 30px -10px rgba(212, 160, 23, 0.45)',
        card: '0 20px 45px -20px rgba(10, 28, 21, 0.45)'
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(circle at 30% 20%, rgba(212,160,23,0.18), transparent 55%)',
        'gold-shine':
          'linear-gradient(135deg, #f5e9c4 0%, #D4A017 45%, #94690f 100%)'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' }
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.6)' },
          '70%': { boxShadow: '0 0 0 16px rgba(37, 211, 102, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease forwards',
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 1.6s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s infinite'
      }
    }
  },
  plugins: []
}
