import typography from '../../styles/typography.module.pcss';
import spacing from '../../styles/spacing.module.pcss';
import { PropsWithChildren, ReactNode } from 'react';

type PageHeadingProps = {
  /**
   * The icon
   */
  icon: ReactNode;
};
export const PageHeading = ({ children, icon }: PropsWithChildren<PageHeadingProps>) => (
  <div className={`${typography.headingWithIcon} ${typography.lg} ${spacing.mtDouble} ${spacing.mbAlmostDouble}`}>
    {icon}
    <h1 className={`${spacing.mlHalf} ${typography.default}`}>{children}</h1>
  </div>
);
