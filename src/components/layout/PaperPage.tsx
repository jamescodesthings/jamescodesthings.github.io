import { PropsWithChildren } from 'react';
import styles from './PaperPage.module.pcss';
import typography from '../../styles/typography.module.pcss';
import { Texture } from '../utils/Texture';
import { PropsWithClassName } from '../../types/PropsWithClassName';
import { TextureName } from '../../types/TextureName';

type PaperPageProps = {
  /**
   * If supplied, the texture name to apply to the page
   */
  textureName?: TextureName;
};

export const PaperPage = ({
  children,
  textureName = 'textured-paper',
  className = '',
}: PropsWithChildren<PropsWithClassName<PaperPageProps>>) => (
  <div className={`${styles.page} ${typography.default} ${className}`}>
    {textureName && <Texture name={textureName} />}
    <div className={`${styles.content}`}>{children}</div>
  </div>
);