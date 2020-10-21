const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  future: {
  },
  purge: [
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Lato',
          ...defaultTheme.fontFamily.sans,
        ]
      },
    },
  },
  variants: {
    cursor: ['responsive', 'hover']
  },
  plugins: [],
}
