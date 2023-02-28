import { PropsWithChildren } from 'react';
import typography from '../../styles/typography.module.pcss';
import styles from './Switch.module.pcss';
import { PropsWithClassName } from '../../types/PropsWithClassName';
import { getClassFromStyles } from '../../utils/get-class-from-styles';

type SwitchProps = {
  /**
   * The switch's value, true or false
   */
  value: boolean;
  /**
   * Emits when the switch's value is changed
   * @param value The new value.
   */
  onChange: (value: boolean) => void;

  /**
   * If supplied, adds to the text class
   */
  textClass?: string;
};

/**
 * A Switch component
 * @param value The current value of the switch
 * @param onChange On change event
 * @param children The switch's label
 * @param className The switch's class
 * @param textclass The switch text's class
 * @constructor
 */
export const Switch = ({
  value,
  onChange,
  children,
  className,
  textClass,
}: PropsWithChildren<PropsWithClassName<SwitchProps>>) => {
  return (
    <label className={`${styles.wrapper} ${getClassFromStyles(styles, className)}`}>
      <div className="relative">
        <label className="sr-only">{children || 'Switch'}</label>
        <input type="checkbox" className="sr-only peer" onChange={() => onChange(!value)} checked={value} />
        <div className={`${styles.background}`} />
        <div className={`${styles.handle}`} />
      </div>
      {children && <div className={`mx-3 ${typography.default} ${textClass}`}>{children}</div>}
    </label>
  );
};
