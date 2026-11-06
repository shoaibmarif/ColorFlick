/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        // A single, quiet accent. The UI itself stays neutral (zinc) so it
        // never competes with — or tints the perception of — the swatches.
        brand: {
          50: '#eef3ff',
          100: '#dce6fe',
          200: '#bfd2fe',
          300: '#93b3fd',
          400: '#608bf9',
          500: '#3b66f5',
          600: '#2549ea',
          700: '#1d38d7',
          800: '#1e30ae',
          900: '#1e2f89',
          950: '#171f53',
        },
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.04)',
        pop: '0 10px 30px -10px rgb(0 0 0 / 0.25)',
      },
      animation: {
        pop: 'pop 0.2s ease-out',
        shake: 'shake 0.35s ease-in-out',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.96)', opacity: '0.6' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%, 75%': { transform: 'translateX(-3px)' },
          '50%': { transform: 'translateX(3px)' },
        },
      },
    },
  },
  plugins: [],
};
