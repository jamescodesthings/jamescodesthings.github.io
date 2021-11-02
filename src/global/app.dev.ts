import '@ionic/core';
import { createLogger } from '../services/logger';

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
  window.dev = true;
  const logger = createLogger('app:dev-script');
  logger('Dev mode script running');

  await baseApp();
};
