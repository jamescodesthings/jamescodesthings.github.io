import styles from './Texture.module.pcss';
import { getClassFromStyles } from '../../utils/get-class-from-styles';

export type TextureName =
  | 'beige-paper'
  | 'black-paper'
  | 'cardboard-flat'
  | 'cardboard'
  | 'clean-gray-paper'
  | 'cream-paper'
  | 'exclusive-paper'
  | 'fabric-dark'
  | 'fabric-light'
  | 'groovepaper'
  | 'handmade-paper'
  | 'light-paper-fibers'
  | 'lined-paper-2'
  | 'natural-paper'
  | 'notebook-dark'
  | 'notebook'
  | 'paper-1'
  | 'paper-2'
  | 'paper-3'
  | 'paper-fibers'
  | 'paper'
  | 'rice-paper-2'
  | 'rice-paper-3'
  | 'rice-paper'
  | 'sandpaper'
  | 'soft-wallpaper'
  | 'textured-paper';

export type TextureProps = {
  /**
   * The texture's name
   */
  name: TextureName;

  /**
   * Additional classes
   */
  className?: string;
};

export const Texture = ({ name = 'fabric-light', className = '' }: TextureProps) => (
  <>
    <div
      className={`${styles.texture} ${getClassFromStyles(styles, name)} ${getClassFromStyles(styles, className)}`}
    ></div>
  </>
);
