import React from 'react';
import styles from './TitleWithBackground.module.pcss';
import spacing from '../../styles/spacing.module.pcss';
import { getClassFromStyles } from '../../utils/get-class-from-styles';

/**
 * Available gradients by name
 */
export type AvailableGradients =
  | 'indigo-pink-amber'
  | 'sunset'
  | 'hyper'
  | 'oceanic'
  | 'cotton-candy'
  | 'gotham'
  | 'mojave'
  | 'beachside'
  | 'gunmetal'
  | 'peachy'
  | 'seafoam'
  | 'pumpkin'
  | 'pandora'
  | 'valentine'
  | 'hawaii'
  | 'lavender'
  | 'wintergreen'
  | 'huckleberry'
  | 'blue-steel'
  | 'arendelle'
  | 'spearmint'
  | 'minnesota'
  | 'bombpop'
  | 'acadia'
  | 'sonora'
  | 'paradise'
  | 'sierra-mist'
  | 'creamsicle'
  | 'midnight'
  | 'borealis'
  | 'strawberry'
  | 'flamingo'
  | 'burning-sunrise'
  | 'apple'
  | 'watermelon'
  | 'flare'
  | 'rasta'
  | 'lust'
  | 'sublime'
  | 'witch'
  | 'powerpuff'
  | 'solid-blue'
  | 'ice'
  | 'sky'
  | 'horizon'
  | 'morning'
  | 'space'
  | 'earth'
  | 'picture'
  | 'messenger'
  | 'sea'
  | 'payment'
  | 'video'
  | 'passion'
  | 'flower'
  | 'cool-sunset'
  | 'pink-neon'
  | 'blue-sand'
  | 'emerald'
  | 'relaxed-rose'
  | 'purple-haze'
  | 'silver'
  | 'orange-coral'
  | 'blue-coral'
  | 'beam-of-light'
  | 'safari-sunset'
  | 'high-tide'
  | 'hunniepop'
  | 'soft-metal'
  | 'coral-sun'
  | 'power-pink'
  | 'powder-blue'
  | 'moody-sunset'
  | 'burnt-sand'
  | 'blue-white-split'
  | 'purple-beam'
  | 'sand-beam'
  | 'island-waves'
  | 'big-sur'
  | 'oahu'
  | 'peach-pie'
  | 'salem'
  | 'purple-burst'
  | 'amber-sunrise'
  | 'sky-sea'
  | 'rocket-power'
  | 'blue-flame'
  | 'warm-glow';

export type TitleWithBackgroundProps = {
  /**
   * The title text to show
   */
  title: string;

  /**
   * The background's gradient
   */
  gradient?: AvailableGradients;

  /**
   * Optional classnames to add
   */
  className?: string;
};

export const TitleWithBackground = ({ title, className = 'to-tr', gradient = 'sublime' }: TitleWithBackgroundProps) => (
  <h1 className={`${styles.titleWithBackground} ${spacing.px}  ${getClassFromStyles(styles, gradient)}`}>
    <span className={`${styles.background} ${getClassFromStyles(styles, className)}`}>
      <span className={`${styles.title}`}>{title}</span>
    </span>
  </h1>
);
