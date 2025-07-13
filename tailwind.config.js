/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'near-black': '#111',
        'mid-gray': '#555',
        'gray': {
          DEFAULT: '#777',
          '500': '#777', 
        },
        'neutral': {
          '900': '#111',
        },
      },
      zIndex: {
        '-1': '-1',
        '999': '999',
      },
      width: {
        '3/10': '30%',
      },
    },
  },
  plugins: [],
}