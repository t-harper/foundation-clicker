import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../client/src/components/common/**/*.{ts,tsx}',
    '../client/src/components/tutorial/**/*.{ts,tsx}',
    '../client/src/assets/svg/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        era: {
          0: {
            primary: 'var(--era-primary)',
            secondary: 'var(--era-secondary)',
            accent: 'var(--era-accent)',
            bg: 'var(--era-bg)',
            surface: 'var(--era-surface)',
            text: 'var(--era-text)',
          },
        },
        credits: '#f5c542',
        knowledge: '#42a5f5',
        influence: '#ab47bc',
        nuclear: '#66bb6a',
        materials: '#8d6e63',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['system-ui', 'sans-serif'],
      },
      animation: {
        'float-up': 'floatUp 1s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'slide-in': 'slideIn 0.3s ease-out',
        'holo-sweep': 'holoSweep 0.8s ease-in-out',
        'click-ripple': 'clickRipple 0.6s ease-out forwards',
        'energy-ring': 'energyRing 0.8s ease-out 0.1s forwards',
        'idle-ring-pulse': 'idleRingPulse 3s ease-in-out infinite',
      },
      keyframes: {
        floatUp: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-60px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px var(--era-accent)' },
          '50%': { boxShadow: '0 0 20px var(--era-accent)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        holoSweep: {
          '0%': { backgroundPosition: '200% 0', opacity: '1' },
          '100%': { backgroundPosition: '-100% 0', opacity: '0' },
        },
        clickRipple: {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        energyRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.4', borderWidth: '3px' },
          '100%': { transform: 'scale(1.6)', opacity: '0', borderWidth: '1px' },
        },
        idleRingPulse: {
          '0%, 100%': { opacity: '0', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
