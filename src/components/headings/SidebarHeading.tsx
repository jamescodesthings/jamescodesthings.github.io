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
  icon?: ReactNode;
};
export const SidebarHeading = ({
  children,
  icon,
  title,
  className,
}: PropsWithChildren<PropsWithClassName<ContactHeadingProps>>) => (
  <div
    className={`${styles.headingWithIcon} ${styles.sidebar} ${typography.default} ${styles.sidebar} ${spacing.mbHalf} ${
      className || ''
    }`}
  >
    {icon && <div className={`${styles.iconWrapper}`}>{icon}</div>}
    <div className={`flex-1`}>
      {title && <h4 className={`${styles.sidebarTitle}  ${typography.h4}`}>{title}</h4>}
      {children && <div className={`${styles.sidebarBody} ${typography.body}`}>{children}</div>}
    </div>
  </div>
);
