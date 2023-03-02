import { PropsWithChildren, ReactNode } from 'react';
import { PropsWithClassName } from '../../types/PropsWithClassName';
import styles from './Headings.module.pcss';
import typography from '../../styles/typography.module.pcss';
import spacing from '../../styles/spacing.module.pcss';

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
  <div
    className={`${styles.headingWithIcon} ${typography.default} ${styles.sidebar} ${spacing.myHalf} ${className || ''}`}
  >
    {icon}
    <div className={`${spacing.mlHalf}`}>
      {title && <h4 className={`${styles.sidebarTitle}  ${typography.h4}`}>{title}</h4>}
      {children && <div className={`${styles.sidebarBody} ${typography.body}`}>{children}</div>}
    </div>
  </div>
);
