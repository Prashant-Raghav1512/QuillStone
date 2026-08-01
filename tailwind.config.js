/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        carbon: '#0b0b0c',
        champagne: {
          DEFAULT: '#c8a878',
          soft: '#d8be96',
          deep: '#a88858',
        },
        line: 'rgba(255,255,255,0.1)',
        sage: '#8aa081',
        amber: '#c8a878',
        rust: '#b06a5a',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
        dramatic: 'cubic-bezier(0.16, 1, 0.3, 1)',
        snappy: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '700': '700ms',
        '900': '900ms',
        '1200': '1200ms',
      },
      keyframes: {
        blobDrift: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-20px) scale(1.08)' },
          '66%': { transform: 'translate(-20px,20px) scale(0.95)' },
        },
        cuePulse: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatYSlow: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(1.5deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(12px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        letterRise: {
          '0%': { opacity: '0', transform: 'translateY(100%) rotate(6deg)' },
          '100%': { opacity: '1', transform: 'translateY(0) rotate(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px -8px rgba(200,168,120,0.3)' },
          '50%': { boxShadow: '0 0 40px -4px rgba(200,168,120,0.5)' },
        },
        shimmerText: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        drawLine: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        blobDrift: 'blobDrift 18s ease-in-out infinite',
        cuePulse: 'cuePulse 2.2s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        floatY: 'floatY 4s ease-in-out infinite',
        floatYSlow: 'floatYSlow 7s ease-in-out infinite',
        fadeUp: 'fadeUp 0.8s var(--ease) forwards',
        fadeIn: 'fadeIn 1s ease forwards',
        fadeLeft: 'fadeLeft 0.8s var(--ease) forwards',
        fadeRight: 'fadeRight 0.8s var(--ease) forwards',
        scaleIn: 'scaleIn 0.6s var(--ease) forwards',
        blurIn: 'blurIn 1s var(--ease) forwards',
        letterRise: 'letterRise 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards',
        glowPulse: 'glowPulse 3s ease-in-out infinite',
        shimmerText: 'shimmerText 4s linear infinite',
        drawLine: 'drawLine 1s var(--ease) forwards',
        spinSlow: 'spinSlow 20s linear infinite',
        pulseRing: 'pulseRing 2s ease-out infinite',
        gradientShift: 'gradientShift 6s ease-in-out infinite',
        ticker: 'ticker 30s linear infinite',
      },
    },
  },
  plugins: [],
};
