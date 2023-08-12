/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'xs': '420px',
      },
      fontFamily:{
        'poppins':['Poppins', 'sans-serif'],
        'roboto':['Roboto', 'sans-serif']
      },
      backgroundColor:{
        'primary':'#E7E7E7',
        'secondary':'#D9D9D9',
        'gen':'#000',
        'high':'#F64B4B',
        'medium':'#E9D100',
        'low':'#72FF80'
      },
      fontSize:{
        'md':'1rem'
      },
      boxShadow:{
        'todoItem':'0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
      }
    },
    plugins: [],
  }
}

