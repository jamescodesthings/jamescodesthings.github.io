import { PropsWithChildren, ReactNode } from 'react';
import { PropsWithClassName } from '../../types/PropsWithClassName';
import styles from './Headings.module.pcss';
import typography from '../../styles/typography.module.pcss';

type ContactHeadingProps = {
  /**
   * The Title
   */
  title?: string;
  /**
   * The icon
   */
  icon: ReactNode;
};
export const SidebarHeading = ({
  children,
  icon,
  title,
  className,
}: PropsWithChildren<PropsWithClassName<ContactHeadingProps>>) => (
  <div className={`${styles.headingWithIcon} ${styles.sidebar} ${className || ''}`}>
    {icon}
    <div className={`${styles.sidebarRightHand}`}>
      {title && <h4 className={`${styles.sidebarTitle} ${typography.h4}`}>{title}</h4>}
      {children && <div className={`${styles.sidebarBody} ${typography.body}`}>{children}</div>}
    </div>
  </div>
);
