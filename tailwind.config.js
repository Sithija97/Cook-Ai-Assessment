/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
          900: '#1E3A8A',
        },
        coral: {
          50:  '#FFF1EE',
          100: '#FCA99A',
          500: '#F26B4E',
          600: '#E05535',
          700: '#C2400C',
        },
        surface: '#F8FAFC',
        border:  '#E2E8F0',
      },
      fontFamily: {
        display: ["'DM Serif Display'", 'Georgia', 'serif'],
        body:    ["'Plus Jakarta Sans'", 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
