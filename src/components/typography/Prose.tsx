import { PropsWithChildren } from 'react';
import typography from '../../styles/typography.module.pcss';
import spacing from '../../styles/spacing.module.pcss';

export const Prose = ({ children }: PropsWithChildren) => (
  <article className={`${typography.body} ${spacing.mall} mt-0`}>{children}</article>
);
