import { PropsWithChildren, ReactNode } from 'react';
import styles from './Badge.module.pcss';
import { getClassFromStyles } from '../../utils/get-class-from-styles';

const imageRegex = /\.(svg|png)$/g;

type BadgeProps = {
  /**
   * The icon (SVG Preferred)
   */
  icon?: ReactNode;
  /**
   * A class to apply to the element that has the background (for changing bg-color)
   */
  bgClass?: string;
  /**
   * A class to apply to the element that has the text (for changing text color)
   */
  textClass?: string;
};
export const Badge = ({
  children,
  icon,
  bgClass = 'bg-stone-700',
  textClass = 'text-white',
}: PropsWithChildren<BadgeProps>) => {
  return (
    <>
      <div className={`${styles.badge} ${getClassFromStyles(styles, bgClass)}`}>
        <div className={`${styles.badgeInner}`}>
          {icon && <span className={`${styles.icon}`}>{icon}</span>}
          <span className={`${styles.text} ${getClassFromStyles(styles, textClass)}`}>{children}</span>
        </div>
      </div>
    </>
  );
};
