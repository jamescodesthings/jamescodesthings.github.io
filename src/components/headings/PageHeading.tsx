import styles from './Headings.module.pcss';
import spacing from '../../styles/spacing.module.pcss';
import typography from '../../styles/typography.module.pcss';
import { PropsWithChildren, ReactNode } from 'react';

type PageHeadingProps = {
  /**
   * The icon
   */
  icon: ReactNode;
};
export const PageHeading = ({ children, icon }: PropsWithChildren<PageHeadingProps>) => (
  <div className={`${styles.headingWithIcon} ${typography.default} ${spacing.mtDouble} ${spacing.mbHalf}`}>
    {icon}
    <h1 className={`${spacing.mlHalf} ${typography.h1}`}>{children}</h1>
  </div>
);
