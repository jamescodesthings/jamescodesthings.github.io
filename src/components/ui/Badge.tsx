import { PropsWithChildren, ReactNode } from 'react';
import styles from './Badge.module.pcss';

type BadgeProps = {
  /**
   * The icon (SVG Preferred)
   */
  icon?: ReactNode;
};
export const Badge = ({ children, icon }: PropsWithChildren<BadgeProps>) => {
  return (
    <>
      <div className={`${styles.badge}`}>
        <div className={`${styles.badgeInner}`}>
          {icon && <span className={`${styles.icon}`}>{icon}</span>}
          <span className={`${styles.text} text-type-dark dark:text-type`}>{children}</span>
        </div>
      </div>
    </>
  );
};
