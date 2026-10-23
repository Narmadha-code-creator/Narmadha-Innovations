/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a0f24',
          800: '#0f1738',
          700: '#172352',
          600: '#1f306d',
          500: '#2b4293',
        },
        purple: {
          brand: '#7928ca',
          light: '#9f55ff',
          glow: '#b87cff',
          surface: '#f6f3ff',
        },
        cyan: {
          brand: '#06b6d4',
          accent: '#00e5ff',
          glow: '#67e8f9',
          light: '#e0f7fa',
        },
        lavender: {
          50: '#fbfaff',
          100: '#f4f1fd',
          200: '#e9e3fb',
          300: '#d5c7f7',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-purple': '0 0 35px -5px rgba(121, 40, 202, 0.35)',
        'glow-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.35)',
        'glass': '0 8px 32px 0 rgba(15, 23, 56, 0.08)',
        'glass-hover': '0 16px 48px 0 rgba(121, 40, 202, 0.16)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
