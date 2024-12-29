/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display : ["Poppins", "sans-serif"],
    },
    extend: {
      // Colors used in project
      colors : {
        primary : "#02343F",
        secondary : "#FCF6F5",
      },
      backgroundImage: {
        'login-bg-img' : "url('./src/assets/images/bg-img.jpg')",
        'signup-bg-img' : "url('./src/assets/images/signup-bg-img.jpg')",
      },
    },
  },
  plugins: [],
}

