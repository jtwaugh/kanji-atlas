/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(220 13% 91%)',
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(224 71% 4%)',
        muted: {
          DEFAULT: 'hsl(220 14% 96%)',
          foreground: 'hsl(220 9% 46%)',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif JP"', '"Hiragino Mincho ProN"', 'serif'],
      },
    },
  },
  plugins: [],
};
