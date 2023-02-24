import { PropsWithChildren } from 'react';
import styles from './EducationContent.module.pcss';

export const EducationContent = ({ children }: PropsWithChildren) => (
  <>
    <section>{children}</section>
  </>
);
