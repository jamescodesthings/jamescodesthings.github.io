import React from 'react';
import styles from './Breakpoint.module.pcss';

/**
 * A quick and dirty media breakpoint tester
 * @constructor
 */
export const Breakpoint = () => (
  <div className="breakpoint-tester">
    <span className={styles.breakpointXs}>xs</span>
    <span className={styles.breakpointSm}>sm</span>
    <span className={styles.breakpointMd}>md</span>
    <span className={styles.breakpointLg}>lg</span>
    <span className={styles.breakpointXl}>xl</span>
    <span className={styles.breakpoint2xl}>xl</span>
  </div>
);
