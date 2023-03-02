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
    <aside className={`${styles.sidebar} ${spacing.py} ${spacing.prHalf} max-sm:!py-0 print:max-sm:!py-4`}>
      {sidebar}
    </aside>
    <div className={`${styles.content} ${spacing.py} ${spacing.plHalf} max-sm:!py-0 print:max-sm:!py-4`}>
      {children}
    </div>
  </section>
);
