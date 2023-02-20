import { PropsWithChildren, ReactNode } from 'react';
import styles from './BodyWithSidebar.module.pcss';

type BodyWithSidebarProps = {
  /**
   * The sidebar content
   */
  sidebar?: ReactNode;
};

export const BodyWithSidebar = ({ children, sidebar }: PropsWithChildren<BodyWithSidebarProps>) => (
  <section className={`${styles.container}`}>
    <div className={`${styles.sidebar}`}>{sidebar}</div>
    <div className={`${styles.content}`}>{children}</div>
  </section>
);
