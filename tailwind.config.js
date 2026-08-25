/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        'am-black': '#111111',
        'am-offwhite': '#f9f9f9',
        'am-gray': '#e5e5e5',
        'am-accent': '#111111',
      },
      fontSize: {
        huge: 'clamp(3rem, 8vw, 10rem)',
        big: 'clamp(2rem, 5vw, 6rem)',
      },
    },
  },
  plugins: [],
};
