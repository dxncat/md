/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        caveat: ['Caveat', 'cursive']
      },
      colors: {
        customYellow: '#FCF6BD',
        customBlue: '#A9DEF9',
        customViolet: '#E4C1F9',
        customGreen: '#D0F4DE',
        customPink: '#FF99C8',
        slate: {
          800: '#575757'
        },
      },
    },
  },
  plugins: [],
}

