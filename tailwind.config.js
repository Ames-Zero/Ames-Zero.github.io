/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./assets/js/**/*.js",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Sans Pro', 'sans-serif'],
      },
      colors: {
        // Match current brand colors
        primary: '#49bf9d',     // Current accent color (teal/green)
        secondary: '#787878',   // Gray text color
      },
      backgroundImage: {
        'hero': "url('/images/vertical-view-grand-canyon-usa.jpg')",
        'overlay': "url('/assets/css/images/overlay.png')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#49bf9d",
          "secondary": "#787878",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#e5e7eb",
        },
        dark: {
          "primary": "#49bf9d",
          "secondary": "#a0a0a0",
          "accent": "#37cdbe",
          "neutral": "#2a2e37",
          "base-100": "#1d1f27",
          "base-200": "#16181e",
          "base-300": "#0f1015",
        },
      },
    ],
  },
};
