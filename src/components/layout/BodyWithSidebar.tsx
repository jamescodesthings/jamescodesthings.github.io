import { PropsWithChildren, ReactNode } from 'react';
import styles from './BodyWithSidebar.module.pcss';
import spacing from '../../styles/spacing.module.pcss';

type BodyWithSidebarProps = {
  /**
   * The sidebar content
   */
  sidebar?: ReactNode;
};

export const BodyWithSidebar = ({ children, sidebar }: PropsWithChildren<BodyWithSidebarProps>) => (
  <section className={`${styles.container}`}>
    <div className={`${styles.sidebar} ${spacing.py} ${spacing.prHalf}`}>{sidebar}</div>
    <div className={`${styles.content} ${spacing.py} ${spacing.plHalf}`}>{children}</div>
  </section>
);
