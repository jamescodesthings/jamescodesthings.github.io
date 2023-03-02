import { PropsWithChildren, ReactNode } from 'react';
import styles from './Badge.module.pcss';
import typography from '../../styles/typography.module.pcss';
import { PropsWithClassName } from '../../types/PropsWithClassName';

type BadgeProps = {
  /**
   * The icon (SVG Preferred)
   */
  icon?: ReactNode;
};
export const Badge = ({ children, icon, className }: PropsWithChildren<PropsWithClassName<BadgeProps>>) => {
  return (
    <>
      <div className={`${styles.badge} ${typography.body} ${className}`}>
        <div className={`${styles.badgeInner}`}>
          {icon && <span className={`${styles.icon} text-[1.2em]`}>{icon}</span>}
          <span className={`${styles.text}  text-type-dark dark:text-type`}>{children}</span>
        </div>
      </div>
    </>
  );
};
