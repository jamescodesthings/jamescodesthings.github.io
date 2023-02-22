import { PropsWithChildren } from 'react';
import styles from './Jumbotron.module.pcss';
import { getClassFromStyles } from '../../utils/get-class-from-styles';
import { Texture } from '../utils/Texture';
import { PropsWithClassName } from '../../types/PropsWithClassName';

export const Jumbotron = ({ className, children }: PropsWithChildren<PropsWithClassName>) => {
  return (
    <section className={`${styles.jumbo} ${getClassFromStyles(styles, className)}`}>
      <div className={`${styles.jumbotronCard}`}>
        <Texture name={`fabric-light`} />
        <div className={`${styles.jumbotronContent}`}>{children}</div>
      </div>
    </section>
  );
};
