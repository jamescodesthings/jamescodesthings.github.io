import { PropsWithChildren } from 'react';
import styles from './Jumbotron.module.pcss';
import { getClassFromStyles } from '../../utils/get-class-from-styles';
import { Texture } from './Texture';

type JumboProps = {
  /**
   * Any additional class names to add to the jumbotron
   */
  className?: string;
};

export const Jumbotron = ({ className, children }: PropsWithChildren<JumboProps>) => {
  return (
    <section className={`${styles.jumbo} ${getClassFromStyles(styles, className)}`}>
      <div className={`${styles['jumbotron-card']} bg-placeholder-railway`}>
        <Texture name={`fabric-light`} />
        <div className={`${styles['jumbotron-content']}`}>{children}</div>
      </div>
    </section>
  );
};
