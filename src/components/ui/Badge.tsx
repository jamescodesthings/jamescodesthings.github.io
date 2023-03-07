import { PropsWithChildren, ReactNode } from 'react';
import { PropsWithClassName } from '../../types/PropsWithClassName';
import typography from '../../styles/typography.module.pcss';
import styles from './Badge.module.pcss';

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
          <span className={`${styles.text}  text-type-dark dark:text-type print:text-type`}>{children}</span>
        </div>
      </div>
    </>
  );
};
