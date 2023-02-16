import React from 'react';
import styles from './Title.module.pcss';
import typography from './Typography.module.pcss';

interface TitleProps {
  /**
   * The title
   */
  title: string;
  /**
   * The subtitle
   */
  subtitle?: string;
}

export const Title = ({ title, subtitle }: TitleProps) => {
  return (
    <header className={styles.header}>
      <h1 className={`${styles.title} ${typography.default}`}>{title}</h1>
      {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
    </header>
  );
};
