/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      blur: {
        xs: '0.5px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}