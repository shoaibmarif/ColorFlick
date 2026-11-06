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
        // Brand palette = the four logo colors. Pages use them freely; the
        // game board itself stays neutral so it never tints the swatches.
        coral: {
          50: '#fff3f1',
          100: '#ffe3df',
          200: '#ffcbc4',
          300: '#fca698',
          400: '#f7806d',
          500: '#f25f4c',
          600: '#de4330',
          700: '#ba3424',
          800: '#992e22',
          900: '#7f2b22',
          950: '#45130d',
        },
        sun: {
          50: '#fffaeb',
          100: '#fff0c6',
          200: '#ffe088',
          300: '#fdcb4c',
          400: '#f5b83d',
          500: '#ec9a12',
          600: '#d0740c',
          700: '#ad520e',
          800: '#8c4012',
          900: '#733512',
          950: '#421a05',
        },
        mint: {
          50: '#effcf7',
          100: '#d8f7ea',
          200: '#b4eed8',
          300: '#81dfc1',
          400: '#4cc9a6',
          500: '#1fb58f',
          600: '#149274',
          700: '#12755f',
          800: '#135d4d',
          900: '#124d41',
          950: '#082b25',
        },
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
