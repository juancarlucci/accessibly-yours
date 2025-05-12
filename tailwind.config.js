/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        theme: 'var(--background)'
      },
      textColor: {
        theme: 'var(--text)'
      }
    }
  },
  plugins: [],
}