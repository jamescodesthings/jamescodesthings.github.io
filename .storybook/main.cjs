const { mergeConfig } = require('vite');
const svgrPlugin = require('vite-plugin-svgr');
const svgr = require('vite-plugin-svgr');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-postcss',
    '@storybook/addon-a11y',
    'storybook-dark-mode',
    'storybook-tailwind-dark-mode',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  staticDirs: ['../public'],
  async viteFinal(config, { configType }) {
    return mergeConfig(config, {
      plugins: [svgr({ exportAsDefault: true })],
      css: {
        modules: {
          localsConvention: 'camelCaseOnly',
        },
      },
    });
  },
};
