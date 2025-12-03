/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aggie-maroon': '#500000',
        'aggie-dark-maroon': '#3C0000',
        'aggie-ochre': '#D6D3C4',
        'aggie-navy': '#2F3E51',
        'aggie-gray': '#707070',
        'aggie-gray-light': '#D1D1D1',
      },
    },
  },
  plugins: [],
}
