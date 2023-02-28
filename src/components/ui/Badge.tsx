import { PropsWithChildren, ReactNode } from 'react';
import styles from './Badge.module.pcss';
import typography from '../../styles/typography.module.pcss';

type BadgeProps = {
  /**
   * The icon (SVG Preferred)
   */
  icon?: ReactNode;
};
export const Badge = ({ children, icon }: PropsWithChildren<BadgeProps>) => {
  return (
    <>
      <div className={`${styles.badge} ${typography.body}`}>
        <div className={`${styles.badgeInner}`}>
          {icon && <span className={`${styles.icon} text-[1.2em]`}>{icon}</span>}
          <span className={`${styles.text}  text-type-dark dark:text-type`}>{children}</span>
        </div>
      </div>
    </>
  );
};
