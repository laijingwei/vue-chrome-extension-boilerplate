module.exports = {
  purge: ['./src/**/*.vue'],
  darkMode: 'media',
  theme: {
    minWidth: {
      '0': '0',
      'popup': '350px',
      full: '100%'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
