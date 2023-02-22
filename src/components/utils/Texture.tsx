import styles from './Texture.module.pcss';
import { getClassFromStyles } from '../../utils/get-class-from-styles';
import { PropsWithClassName } from '../../types/PropsWithClassName';
import { TextureName } from '../../types/TextureName';

export type TextureProps = {
  /**
   * The texture's name
   */
  name: TextureName;
};

export const Texture = ({ name = 'fabric-light', className = '' }: PropsWithClassName<TextureProps>) => (
  <>
    <div
      className={`${styles.texture} ${getClassFromStyles(styles, name)} ${getClassFromStyles(styles, className)}`}
    ></div>
  </>
);
