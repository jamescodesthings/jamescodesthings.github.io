import '@ionic/core';
import { createLogger } from '../services/logger';

export default async (): Promise<void> => {
  const logger = createLogger('app:base-script');

  logger('Base app script running');
};
