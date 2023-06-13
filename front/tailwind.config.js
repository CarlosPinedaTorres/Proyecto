/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'fondo': 'linear-gradient(45deg, #3a3a3a, #2b2b2b, #1c1c1c, #0d0d0d, #000000)',
        'card': 'linear-gradient(135deg, #1a2a4f, #1e375d, #22446b, #265179, #2a5e87)',
        // 'card': 'linear-gradient(135deg, #8a3300, #a03d12, #b54724, #ca5236, #df5d48)',
      })},
  
 

     
  },
  plugins: [],
}

