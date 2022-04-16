const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        background: 'rgb(17, 24, 39)',
        lightBlue: 'rgb(6, 70, 99)',
        navHiddenBack: 'rgba(6, 70, 99, 0.4)'
      }
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwind-scrollbar")
  ],
  variants: {
    visibility: ["group-hover"],
    scrollbar: ['dark']
  }
}
