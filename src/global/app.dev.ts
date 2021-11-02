import '@ionic/core';
import { debug } from 'debug';

import baseApp from './app';

declare global {
  interface Window {
    /**
     * True if the app is served in dev mode
     */
    dev: boolean;
  }
}

export default async (): Promise<void> => {
  const logger = debug('app');
  logger.enabled = true;
  window.dev = true;
  logger('Dev mode script running');

  await baseApp();
};
