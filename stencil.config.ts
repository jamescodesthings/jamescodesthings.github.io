import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import debug from 'debug';
import nodePolyfills from 'rollup-plugin-node-polyfills';

const log = debug('stencil');
log.enabled = true;
const dev: boolean = process?.argv?.indexOf('--dev') !== -1;

let globalScript = 'src/global/app.ts';
if (dev) {
  log('Developer mode');
  globalScript = 'src/global/app.dev.ts';
}

export const config: Config = {
  globalScript,
  globalStyle: 'src/global/app.scss',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      empty: true,
      serviceWorker: null,
      polyfills: true,
    },
  ],
  plugins: [sass()],
  rollupPlugins: {
    after: [nodePolyfills()],
  },
};
