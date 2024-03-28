const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

const round = num =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '');
const rem = px => `${round(px / 16)}rem`;
const em = (px, base) => `${round(px / base)}em`;

// Font sizes
const xs = rem(9);
const sm = rem(10);
const md = rem(12);
const lg = rem(14);
const xl = rem(16);
const xl2 = rem(18);
const xl6 = rem(26);
const xl7 = rem(28);

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
        'light': colors.stone['700'],
        'light-dark': colors.stone['100'],
        'lighter': colors.stone['600'],
        'lighter-dark': colors.stone['300'],
        'primary': colors.amber['600'],
        'accent': colors.fuchsia['500'],
        'tertiary': colors.sky['500'],
      },
      fontSize: {
        '2xs': '.6rem',
        'xs': xs,
        'sm': sm,
        'base': md,
        'lg': lg,
        'xl': xl,
        '2xl': xl2,
        '6xl': xl6,
        '7xl': xl7,
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
        'placeholder-abandoned': "url('../../assets/backgrounds/1.png')",
        'placeholder-abandoned-2': "url('../../assets/backgrounds/6.jpg')",
        'placeholder-fry': "url('../../assets/backgrounds/2.jpg')",
        'placeholder-walk': "url('../../assets/backgrounds/3.jpg')",
        'placeholder-walk-2': "url('../../assets/backgrounds/4.jpg')",
        'placeholder-walk-3': "url('../../assets/backgrounds/5.jpg')",
      },
      typography: theme => ({
        'xs': {
          css: {
            fontSize: xs,
          },
        },
        'sm': {
          css: {
            fontSize: sm,
          },
        },
        'base': {
          css: {
            fontSize: md,
          },
        },
        'lg': {
          css: {
            fontSize: lg,
          },
        },
        'xl': {
          css: {
            fontSize: xl,
          },
        },
        '2xl': {
          css: {
            fontSize: xl2,
          },
        },
      }),
    },
    variants: {
      backgroundImage: ['responsive', 'hover', 'before'],
      linearGradients: ['responsive', 'hover', 'before'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
