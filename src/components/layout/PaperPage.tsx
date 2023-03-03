import { PropsWithChildren } from 'react';
import { Texture } from '../utils/Texture';
import { PropsWithClassName } from '../../types/PropsWithClassName';
import { TextureName } from '../../types/TextureName';
import { PageBreak } from './PageBreak';

import typography from '../../styles/typography.module.pcss';
import utils from '../../styles/utils.module.pcss';
import spacing from '../../styles/spacing.module.pcss';
import styles from './PaperPage.module.pcss';
import { Container } from '../ui/Container';

type PaperPageProps = {
  /**
   * If supplied, the texture name to apply to the page
   */
  textureName?: TextureName;
  /**
   * If true, this page will map 1-1 with ISO paper A4 pages.
   * Otherwise, its height and aspect ratio will be free-flowing.
   */
  fixedToPaper?: boolean;
};

export const PaperPage = ({
  children,
  textureName = 'textured-paper',
  fixedToPaper = true,
  className = `rounded-lg ${spacing.mb} ${spacing.pall}`,
}: PropsWithChildren<PropsWithClassName<PaperPageProps>>) => (
  <>
    <Container>
      <div className={`${styles.page} ${typography.default} ${!fixedToPaper ? styles.notFixed : ''} ${className}`}>
        {textureName && <Texture name={textureName} />}
        <div className={`${styles.content}`}>{children}</div>
      </div>
    </Container>
    <PageBreak />
  </>
);
