/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0B1120',

        surface: '#161B22',

        primary: {
          DEFAULT: '#8B5CF6',
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },

        accent: {
          DEFAULT: '#C4B5FD',
          300: '#DDD6FE',
          400: '#C4B5FD',
          500: '#A78BFA',
          600: '#8B5CF6',
        },

        secondary: {
          DEFAULT: '#7C3AED',
          300: '#A78BFA',
          400: '#8B5CF6',
          500: '#7C3AED',
          600: '#6D28D9',
        },

        text: '#F8FAFC',

        muted: '#94A3B8',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      backgroundImage: {
        'gradient-primary':
          'linear-gradient(135deg,#8B5CF6 0%,#A78BFA 100%)',

        'gradient-secondary':
          'linear-gradient(135deg,#7C3AED 0%,#C4B5FD 100%)',

        'gradient-radial':
          'radial-gradient(circle at center,var(--tw-gradient-stops))',

        'hero-grid':
          "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1v38h38V1H1z' fill='%23ffffff' fill-opacity='0.025'/%3E%3C/svg%3E\")",
      },

      boxShadow: {
        'glow-primary':
          '0 0 40px -12px rgba(139,92,246,.35)',

        'glow-accent':
          '0 0 40px -12px rgba(196,181,253,.25)',

        'glow-secondary':
          '0 0 35px -12px rgba(124,58,237,.30)',

        glass:
          '0 10px 35px rgba(0,0,0,.35)',
      },

      animation: {
        blob: 'blob 12s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'fade-in': 'fadeIn .6s ease forwards',
        'slide-up': 'slideUp .7s ease forwards',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'bounce-slow': 'bounceSlow 2.5s ease-in-out infinite',
      },

      keyframes: {
        blob: {
          '0%,100%': {
            transform: 'translate(0,0) scale(1)',
          },
          '33%': {
            transform: 'translate(30px,-40px) scale(1.08)',
          },
          '66%': {
            transform: 'translate(-20px,20px) scale(.95)',
          },
        },

        float: {
          '0%,100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-16px)',
          },
        },

        'gradient-x': {
          '0%,100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },

        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },

        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },

        pulseGlow: {
          '0%,100%': {
            opacity: '.45',
          },
          '50%': {
            opacity: '.75',
          },
        },

        shimmer: {
          '0%': {
            'background-position': '-1000px 0',
          },
          '100%': {
            'background-position': '1000px 0',
          },
        },

        bounceSlow: {
          '0%,100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-8px)',
          },
        },
      },
    },
  },

  plugins: [],
};