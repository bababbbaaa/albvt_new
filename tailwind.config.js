/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '0rem',
        md: '0rem',
        lg: '0rem',
        xl: '0rem'
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1180px',
      xl: '1440px'
    },
    boxShadow: {
      'md': '0px 8px 24px rgba(149, 157, 165, 0.2)', 
      // '2xl': 'rgba(0, 0, 0, 0.05) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px'
    },
    colors: {
      'transparent': 'transparent',
      'white': '#FFFFFF',
      'main': '#6E9AEF',
      'blue': '#227FD6',
      'danger': '#A75F4F'
    }
  },
  plugins: []
}
