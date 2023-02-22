import { PropsWithClassName } from '../../types/PropsWithClassName';
import { getClassFromStyles } from '../../utils/get-class-from-styles';
import styles from './DevIcon.module.pcss';
import { DevIconName } from '../../types/DevIconName';

type DevIconProps = {
  /**
   * The icon name
   */
  icon: DevIconName;
};

/**
 * A Dev Icon component, spits out dev icons
 * @constructor
 */
export const DevIcon = ({
  icon = 'devicon-apple-original',
  className = 'colored',
}: PropsWithClassName<DevIconProps>) => {
  return <i className={`${getClassFromStyles(styles, icon)} ${getClassFromStyles(styles, className)}`} />;
};
