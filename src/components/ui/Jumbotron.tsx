import { PropsWithChildren } from 'react';
import { getClassFromStyles } from '../../utils/get-class-from-styles';
import { Texture } from '../utils/Texture';
import { PropsWithClassName } from '../../types/PropsWithClassName';
import styles from './Jumbotron.module.pcss';
import { Container } from './Container';

export const Jumbotron = ({ className, children }: PropsWithChildren<PropsWithClassName>) => {
  return (
    <Container screen={true} hideInPrint={true}>
      <section className={`${styles.jumbo} ${getClassFromStyles(styles, className)}`}>
        <div className={`${styles.jumbotronCard}`}>
          <Texture name={`fabric-light`} />
          <div className={`${styles.jumbotronContent}`}>{children}</div>
        </div>
      </section>
    </Container>
  );
};
