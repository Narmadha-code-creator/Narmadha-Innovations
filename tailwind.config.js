/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        diwali: {
          dark: '#070314',       // Midnight temple sky
          night: '#0d0722',      // Deep mystical indigo
          violet: '#220847',     // Royal purple
          saffron: '#FF6B00',    // Bright Indian saffron
          gold: '#FFD700',       // Shimmering imperial gold
          amber: '#F59E0B',      // Warm flame amber
          pink: '#EC4899',       // Hot festive pink
          magenta: '#D946EF',    // Electric magenta
          emerald: '#10B981',    // Peacock emerald
          turquoise: '#06B6D4',  // Festive turquoise
          crimson: '#E11D48',    // Vermillion red
        }
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        cinzel: ['Cinzel Decorative', 'serif'],
        rozha: ['Rozha One', 'serif'],
        script: ['Great Vibes', 'cursive'],
      },
      boxShadow: {
        'glow-gold': '0 0 35px -5px rgba(255, 215, 0, 0.45)',
        'glow-saffron': '0 0 30px -4px rgba(255, 107, 0, 0.45)',
        'glow-pink': '0 0 30px -4px rgba(236, 72, 153, 0.45)',
        'glow-flame': '0 0 45px 5px rgba(255, 165, 0, 0.55)',
        'glow-emerald': '0 0 30px -4px rgba(16, 185, 129, 0.45)',
        'glow-violet': '0 0 35px -5px rgba(168, 85, 247, 0.45)',
      },
      animation: {
        'flame-flicker': 'flame 1.5s ease-in-out infinite alternate',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatRev 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        flame: {
          '0%': { transform: 'scale(1) rotate(-1deg)', filter: 'brightness(1)' },
          '50%': { transform: 'scale(1.08, 0.95) rotate(2deg)', filter: 'brightness(1.2)' },
          '100%': { transform: 'scale(0.96, 1.05) rotate(-2deg)', filter: 'brightness(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(12px) rotate(4deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
