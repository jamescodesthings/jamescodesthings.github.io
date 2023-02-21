import typography from '../../styles/typography.module.pcss';
import spacing from '../../styles/spacing.module.pcss';
import { PropsWithChildren } from 'react';

type PageHeadingProps = {
  /**
   * The title
   */
  title: string;
};
const PageHeading = ({ children, title }: PropsWithChildren<PageHeadingProps>) => (
  <div className={`${typography.headingWithIcon} ${spacing.mall}`}>
    {children}
    <h1 className={`${spacing.mlHalf} ${typography.default}`}>{title}</h1>
  </div>
);

export const CoverLetterHeading = () => (
  <PageHeading title={'Cover Letter'}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -5 24 24" width="24" fill="currentColor">
      <path d="M2 0h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v10h16V2H2zm3 6h6a1 1 0 0 1 0 2H5a1 1 0 1 1 0-2zm10-5h2v2h-2V3z"></path>
    </svg>
  </PageHeading>
);
