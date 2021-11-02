import '@ionic/core';
import { debug } from 'debug';

export default async (): Promise<void> => {
  const logger = debug('app');
  logger.enabled = true;

  logger('Base app script running');
};
