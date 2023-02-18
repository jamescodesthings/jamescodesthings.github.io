import React from 'react';
import styles from './Breakpoint.module.pcss';

/**
 * A quick and dirty media breakpoint tester
 * @constructor
 */
export const Breakpoint = () => (
  <div className="breakpoint-tester">
    <span className={styles['breakpoint-xs']}>xs</span>
    <span className={styles['breakpoint-sm']}>sm</span>
    <span className={styles['breakpoint-md']}>md</span>
    <span className={styles['breakpoint-lg']}>lg</span>
    <span className={styles['breakpoint-xl']}>xl</span>
    <span className={styles['breakpoint-2xl']}>xl</span>
  </div>
);
