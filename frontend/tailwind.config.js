/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'fasal-green': '#2E7D32',
        'fasal-green-light': '#4CAF50',
        'fasal-blue': '#4FC3F7',
        'fasal-yellow': '#FBC02D',
        'fasal-brown': '#6D4C41',
        'fasal-dark': '#0a0e1a',
        'fasal-dark-2': '#0f1420',
        'fasal-dark-3': '#151b2e',
      },
      fontFamily: {
        'display': ['Inter', 'sans-serif'],
      },
      maxWidth: {
        'app': '1280px',
      },
    },
  },
  plugins: [],
}
