import styles from './Texture.module.pcss';
import { getClassFromStyles } from '../../utils/get-class-from-styles';

export type TextureProps = {
  /**
   * The texture's name
   */
  name: string;
};

export const Texture = ({ name = 'fabric-light' }: TextureProps) => (
  <>
    <div className={`${styles.texture} ${getClassFromStyles(styles, name)}`}></div>
  </>
);
