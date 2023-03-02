import { PropsWithChildren } from 'react';
import { Texture } from '../utils/Texture';
import { PropsWithClassName } from '../../types/PropsWithClassName';
import { TextureName } from '../../types/TextureName';
import { PageBreak } from './PageBreak';

import typography from '../../styles/typography.module.pcss';
import utils from '../../styles/utils.module.pcss';
import spacing from '../../styles/spacing.module.pcss';
import styles from './PaperPage.module.pcss';

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
  <>
    <div className={`${utils.contain} ${spacing.pb} ${spacing.firstPt}`}>
      <div className={`${styles.page} ${typography.default} ${className}`}>
        {textureName && <Texture name={textureName} />}
        <div className={`${styles.content}`}>{children}</div>
      </div>
    </div>
    <PageBreak />
  </>
);
