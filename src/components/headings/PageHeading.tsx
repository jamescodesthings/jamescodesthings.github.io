import styles from './Headings.module.pcss';
import { PropsWithChildren, ReactNode } from 'react';

type PageHeadingProps = {
  /**
   * The icon
   */
  icon: ReactNode;
};
export const PageHeading = ({ children, icon }: PropsWithChildren<PageHeadingProps>) => (
  <div className={`${styles.headingWithIcon}`}>
    {icon}
    <h1 className={`${styles.pageHeadingH1}`}>{children}</h1>
  </div>
);
