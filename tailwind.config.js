/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        background: '#0f0f0f', 
        navBg: '#293c5e', 
        fontPrimary:'#76abae',
        inputBg:'#232d3f',
        btnBg:'#eeeeee',
      },
      fontFamily: {
        sans: ['canva sans','Roboto', 'sans-serif'], 
        serif: ['Georgia', 'serif'],   
      },
    },
  },
  plugins: [],
}

