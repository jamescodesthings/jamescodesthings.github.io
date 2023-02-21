import React from 'react';
import styles from './TitleWithBackground.module.pcss';
import spacing from '../../styles/spacing.module.pcss';
import { getClassFromStyles } from '../../utils/get-class-from-styles';
import { PropsWithClassName } from '../../types/PropsWithClassName';
import { AvailableGradients } from '../../types/available-gradients';

export type TitleWithBackgroundProps = {
  /**
   * The title text to show
   */
  title: string;

  /**
   * The background's gradient
   */
  gradient?: AvailableGradients;
};

export const TitleWithBackground = ({
  title,
  className = 'to-tr',
  gradient = 'sublime',
}: PropsWithClassName<TitleWithBackgroundProps>) => (
  <h1 className={`${styles.titleWithBackground} ${spacing.px}  ${getClassFromStyles(styles, gradient)}`}>
    <span className={`${styles.background} ${getClassFromStyles(styles, className)}`}>
      <span className={`${styles.title}`}>{title}</span>
    </span>
  </h1>
);
