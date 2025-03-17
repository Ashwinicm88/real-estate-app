/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {
    screens: {
      'mobile-s': '320px',  // Small mobile
      'mobile-m': '375px',  // Medium mobile
      'mobile-l': '425px',  // Large mobile
    },
  },
},
  plugins: [],
}

