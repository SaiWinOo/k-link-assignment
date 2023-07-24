/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'primary' : '#151D72',
        'secondary' : '#2E3EA1',
        'bg' : '#F0F3FF',
      }
    },
  },
  plugins: [],
}

