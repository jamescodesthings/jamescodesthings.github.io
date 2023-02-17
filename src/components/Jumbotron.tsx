import { PropsWithChildren } from 'react';
import styles from './Jumbotron.module.pcss';
import { getClassFromStyles } from '../utils/get-class-from-styles';

type JumboProps = {
  /**
   * Any additional class names to add to the jumbotron
   */
  className?: string;
};

export const Jumbotron = ({ className, children }: PropsWithChildren<JumboProps>) => {
  return (
    <section className={`jumbo ${getClassFromStyles(styles, className)}`}>
      <div className={`${styles.jumbotron}`}>{children}</div>
    </section>
  );
};
