/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth:{
        maxContent:'1000px'
      },
      colors: {
        white: '#FFFFFF',
        blue:{
          5:'#F0F4FB',
          25:'#0DCAF0',
          50:'#5F6EF1',
          100:'#3C4EF1',
          300:'#4154F1',
          500:'#012970',
        },
        
        gray:{
          100:'#F0F4FB',
          200:'#6C757D',
          500:'#757F8E',
        },
        lightblack:'#212529'
      },
      fontFamily:{
        inter:['Inter', 'sans-serif'],
        nunito:['Nunito','sans-serif']
      }
    },
  },
  plugins: [],
}