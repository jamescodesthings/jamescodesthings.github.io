import typography from '../../styles/typography.module.pcss';
import spacing from '../../styles/spacing.module.pcss';
import { PropsWithChildren, ReactNode } from 'react';
import { PropsWithClassName } from '../../types/PropsWithClassName';
import { getClassFromStyles } from '../../utils/get-class-from-styles';

type ContactHeadingProps = {
  /**
   * The Title
   */
  title: string;
  /**
   * The icon
   */
  icon: ReactNode;
};
export const SidebarHeading = ({
  children,
  icon,
  className,
  title,
}: PropsWithChildren<PropsWithClassName<ContactHeadingProps>>) => (
  <div
    className={`${typography.headingWithIcon} ${typography.default} ${typography.indigo} ${
      spacing.myHalf
    } ${getClassFromStyles({}, className)}`}
  >
    {icon}
    <div className={`${spacing.mlHalf} ${typography.default}`}>
      <h4 className={`${typography.accent}`}>{title}</h4>
      <div className={`font-normal`}>{children}</div>
    </div>
  </div>
);
