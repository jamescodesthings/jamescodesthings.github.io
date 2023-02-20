import { PropsWithChildren } from 'react';
import typography from '../../styles/typography.module.pcss';
import styles from './Switch.module.pcss';

type SwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
};

/**
 * A Switch component
 * @param value The current value of the switch
 * @param onChange On change event
 * @param children The switch's label
 * @param className The switch's class
 * @constructor
 */
export const Switch = ({ value, onChange, children, className }: PropsWithChildren<SwitchProps>) => {
  return (
    <label className={`${styles.wrapper} ${className}`}>
      <div className="relative">
        <label className="sr-only">{children || 'Switch'}</label>
        <input type="checkbox" className="sr-only peer" onChange={() => onChange(!value)} checked={value} />
        <div className={`${styles.background}`} />
        <div className={`${styles.handle}`} />
      </div>
      {children && <div className={`mx-3 ${typography.default}`}>{children}</div>}
    </label>
  );
};
