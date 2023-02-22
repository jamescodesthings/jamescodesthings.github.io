import { PropsWithChildren } from 'react';
import styles from './Highlight.module.pcss';
import { getClassFromStyles } from '../../utils/get-class-from-styles';
import { PropsWithClassName } from '../../types/PropsWithClassName';

export const Highlight = ({ children, className = 'accent' }: PropsWithChildren<PropsWithClassName>) => (
  <span className={`${styles.highlight} ${getClassFromStyles(styles, className)}`}>{children}</span>
);
