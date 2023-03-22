/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'mint' : '#CDF0EA',
        'light' : '#F9F9F9',
        'pink' : '#F7DBF0',
        'purple': '#BEAEE2'
      },
    },
  },
  plugins: [],
}
