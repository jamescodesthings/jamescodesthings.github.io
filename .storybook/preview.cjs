import '../src/index.css';
import '/node_modules/devicon/devicon.min.css';

const sixteenNinePortrait = input => (parseInt(input, 10) / 9) * 16 + 'px';
const sixteenNineLandscape = input => (parseInt(input, 10) / 16) * 9 + 'px';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      xs: {
        name: 'XS',
        styles: {
          width: '320px',
          height: sixteenNinePortrait('320px'),
        },
        type: 'mobile',
      },
      sm: {
        name: 'SM',
        styles: {
          width: '640px',
          height: sixteenNinePortrait('640px'),
        },
        type: 'mobile',
      },
      md: {
        name: 'MD',
        styles: {
          width: '768px',
          height: sixteenNineLandscape('768px'),
        },
        type: 'desktop',
      },
      lg: {
        name: 'LG',
        styles: {
          width: '1024px',
          height: sixteenNineLandscape('1024px'),
        },
        type: 'desktop',
      },
      xl: {
        name: 'XL',
        styles: {
          width: '1280px',
          height: sixteenNineLandscape('1280px'),
        },
        type: 'desktop',
      },
      XL2: {
        name: '2XL',
        styles: {
          width: '1536px',
          height: sixteenNineLandscape('1536px'),
        },
        type: 'desktop',
      },
    },
  },
};
