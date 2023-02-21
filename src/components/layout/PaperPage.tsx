import { PropsWithChildren } from 'react';
import styles from './PaperPage.module.pcss';
import typography from '../../styles/typography.module.pcss';
import { Texture, TextureName } from '../utils/Texture';

type PaperPageProps = {
  /**
   * If supplied, the texture name to apply to the page
   */
  textureName?: TextureName;

  /**
   * Any additional classnames to apply to the outer wrapper
   */
  className?: string;
};

export const PaperPage = ({ children, textureName, className = '' }: PropsWithChildren<PaperPageProps>) => (
  <>
    <div className={`${styles.page} ${typography.default} ${className}`}>
      {textureName && <Texture name={textureName} className={'opacity-70 dark:opacity-10'} />}
      <div className={`${styles.content}`}>{children}</div>
    </div>
  </>
);
