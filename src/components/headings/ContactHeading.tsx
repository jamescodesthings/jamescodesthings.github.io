import typography from '../../styles/typography.module.pcss';
import spacing from '../../styles/spacing.module.pcss';
import { PropsWithChildren, ReactNode } from 'react';

type ContactHeadingProps = {
  /**
   * The icon
   */
  icon: ReactNode;
};
export const ContactHeading = ({ children, icon }: PropsWithChildren<ContactHeadingProps>) => (
  <div
    className={`${typography.headingWithIcon} ${typography.default} ${typography.indigo} ${spacing.mb} ${spacing.mtHalf}`}
  >
    {icon}
    <div className={`${spacing.mlHalf} ${typography.default}`}>{children}</div>
  </div>
);
