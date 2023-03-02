import { PropsWithChildren } from 'react';
import { getClassFromStyles } from '../../utils/get-class-from-styles';
import { Texture } from '../utils/Texture';
import { PropsWithClassName } from '../../types/PropsWithClassName';
import spacing from '../../styles/spacing.module.pcss';
import utils from '../../styles/utils.module.pcss';
import styles from './Jumbotron.module.pcss';

export const Jumbotron = ({ className, children }: PropsWithChildren<PropsWithClassName>) => {
  return (
    <div className={`${utils.contain} ${spacing.pb} ${spacing.firstPt} ${utils.screen} print:hidden`}>
      <section className={`${styles.jumbo} ${getClassFromStyles(styles, className)}`}>
        <div className={`${styles.jumbotronCard}`}>
          <Texture name={`fabric-light`} />
          <div className={`${styles.jumbotronContent}`}>{children}</div>
        </div>
      </section>
    </div>
  );
};
