import { PropsWithChildren } from 'react';
import typography from '../../styles/typography.module.pcss';
import { PropsWithClassName } from '../../types/PropsWithClassName';
import { getClassFromStyles } from '../../utils/get-class-from-styles';

export const Prose = ({ children, className }: PropsWithChildren<PropsWithClassName>) => (
  <article className={`${typography.proseWrapper} ${getClassFromStyles({}, className)}`}>{children}</article>
);
