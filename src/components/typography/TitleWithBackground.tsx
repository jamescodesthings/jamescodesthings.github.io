import React from 'react';
import styles from './TitleWithBackground.module.pcss';
import { getClassFromStyles } from '../../utils/get-class-from-styles';

export type TitleWithBackgroundProps = {
  /**
   * Optional classnames to add
   */
  className?: string;
  /**
   * The title text to show
   */
  title: string;
};

export const TitleWithBackground = ({ title, className = 'indigo-pink-amber to-tr' }: TitleWithBackgroundProps) => (
  <h1 className={`${styles['title-with-background']} ${getClassFromStyles(styles, className)}`}>
    <span className={`${styles.background}`}>
      <span className={`${styles.title}`}>{title}</span>
    </span>
  </h1>
);
