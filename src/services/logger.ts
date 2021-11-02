import { debug, Debugger } from 'debug';
import { isDev } from '../helpers/is-dev';

/**
 * A logger service that uses debug to log
 */
export class Logger {
  /**
   * The storage key for enabling/disabling loggers
   */
  static readonly storageKey = 'enable-loggers';

  /**
   * All available loggers
   */
  static loggers: Debugger[] = [];

  /**
   * Create and return a logger, or use an existing logger if it is available
   * @param tag The log tag to use (colon separated)
   * @return the logger method
   */
  static create(tag: string): Debugger {
    if (!this.loggers[tag]) {
      this.newLogger(tag);
    }

    return this.loggers[tag];
  }

  private static newLogger(tag: string) {
    this.loggers[tag] = debug(tag);
    if (this.shouldEnable()) {
      this.loggers[tag].enabled = true;
    }
  }

  private static shouldEnable(): boolean {
    return isDev() || localStorage?.getItem(this.storageKey) === 'true';
  }

  /**
   * Toggles all loggers on/off
   */
  static toggle(): void {
    let newValue = 'true';
    try {
      if (localStorage?.getItem(this.storageKey) === 'true') {
        newValue = 'false';
      }

      localStorage?.setItem(this.storageKey, newValue);
    } catch (error) {
      console.error('Could not toggle loggers', newValue, error);
    }
  }
}

export const createLogger = (tag: string): Debugger => Logger.create(tag);

declare global {
  interface Window {
    /**
     * Toggles loggers
     */
    toggleLoggers: () => void;
  }
}

// Allows us to toggle loggers for prod console.logging via the dev console
window.toggleLoggers = () => Logger.toggle();
