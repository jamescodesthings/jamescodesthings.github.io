import { PropsWithChildren, ReactNode } from 'react';
import { PropsWithClassName } from '../../types/PropsWithClassName';
import { getClassFromStyles } from '../../utils/get-class-from-styles';
import styles from './Headings.module.pcss';

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
}: PropsWithChildren<PropsWithClassName<ContactHeadingProps>>) => (
  <div className={`${styles.headingWithIcon} ${styles.sidebar}`}>
    {icon}
    <div className={`${styles.sidebarRightHand}`}>
      {title && <h4 className={`${styles.sidebarTitle}`}>{title}</h4>}
      {children && <div className={`${styles.sidebarBody}`}>{children}</div>}
    </div>
  </div>
);
