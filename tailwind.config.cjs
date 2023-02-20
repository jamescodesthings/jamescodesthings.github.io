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
      fontSize: {
        '2xs': '.5rem',
        '10xl': '5rem',
      },
      zIndex: {
        1: '1',
      },
      backgroundImage: {
        'placeholder': "url('https://picsum.photos/1920/1280')",
        'placeholder-1': "url('https://picsum.photos/id/811/1920/1280')",
        'placeholder-2': "url('https://picsum.photos/id/450/1920/1280')",
        'placeholder-3': "url('https://picsum.photos/id/474/1920/1280')",
        'placeholder-4': "url('https://picsum.photos/id/296/1920/1280')",
        'placeholder-railway': "url('https://picsum.photos/id/345/1920/1280')",
      },
      colors: {
        primary: '#5bb7de',
        secondary: '#e87020',
        tertiary: '#be2adb',
      },
    },

    variants: {
      backgroundImage: ['responsive', 'hover', 'before'],
      linearGradients: ['responsive', 'hover', 'before'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
