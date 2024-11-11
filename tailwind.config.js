/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/.{html,js}"],
    theme: {
      extend: {
        rotate: {
          '30': '30deg',
        },
        boxShadow: {
          custom: '0px 0px 10px rgba(0, 0, 0, 0.25)',
        },
      },
    },
    plugins: [],
  }