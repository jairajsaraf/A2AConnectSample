import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'aggie-maroon': '#500000',
        'aggie-dark_maroon': '#3C0000',
        'aggie-white': '#FFFFFF',
        'aggie-black': '#000000',
        'aggie-black-light': '#3E3E3E',
        'aggie-navy': '#2F3E51',
        'aggie-gray': '#707070',
        'aggie-gray-light': '#D1D1D1',
        'aggie-gray-100': '#f6f6f6',
        'aggie-ochre': '#D6D3C4',
        aggie: {
        maroonn: "#500000",   // Primary brand
        dark: "#3c001c",     // Brand Dark
        light: "#732f2f",    // Brand Light
        white: "#ffffff",
        black: "#000000",
      },
      "aggie-grays": {
        100: "#f6f6f6",
        200: "#eaeaea",
        300: "#d1d1d1",
        400: "#a7a7a7",
        500: "#707070",
        600: "#626262",
        700: "#535353",
        800: "#3e3e3e",
        900: "#202020",
      },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
};

export default config;
