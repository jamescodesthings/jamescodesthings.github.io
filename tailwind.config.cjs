const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'mono': ['Roboto Mono', ...defaultTheme.fontFamily.mono],
      'mono-alt': ['Major Mono Display', ...defaultTheme.fontFamily.sans],
      'sans': ['Montserrat', ...defaultTheme.fontFamily.sans],
      'display': ['Montserrat', ...defaultTheme.fontFamily.sans],
      'body': ['Montserrat', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        'type': colors.stone['900'],
        'type-dark': colors.stone['50'],
        'page-dark': '#161514',
        'primary': colors.amber['600'],
        'accent': colors.fuchsia['500'],
        'tertiary': colors.sky['500'],
      },
      fontSize: {
        '2xs': '.5rem',
        '10xl': '5rem',
      },
      zIndex: {
        1: '1',
      },
      backgroundImage: {
        'sunset': 'linear-gradient(43deg, #9333ea 11%, #ec4899 69%, #f97316 84%, #facc15 91%)',
        'placeholder': "url('https://picsum.photos/1920/1280')",
        'placeholder-1': "url('https://picsum.photos/id/811/1920/1280')",
        'placeholder-2': "url('https://picsum.photos/id/450/1920/1280')",
        'placeholder-3': "url('https://picsum.photos/id/474/1920/1280')",
        'placeholder-4': "url('https://picsum.photos/id/296/1920/1280')",
        'placeholder-railway': "url('https://picsum.photos/id/345/1920/1280')",
      },
    },
    variants: {
      backgroundImage: ['responsive', 'hover', 'before'],
      linearGradients: ['responsive', 'hover', 'before'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
