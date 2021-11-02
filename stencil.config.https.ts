import { Config } from '@stencil/core';
import { config as baseConfig } from './stencil.config';
import { readFileSync } from 'fs';

const cert = readFileSync('https/localhost.crt', 'utf8');
const key = readFileSync('https/localhost.key', 'utf8');

/**
 * Adds https configuration: useful for various permissions allowed over https only in web.
 */
export const config: Config = {
  ...baseConfig,
  devServer: {
    https: {
      cert,
      key,
    },
  },
};
