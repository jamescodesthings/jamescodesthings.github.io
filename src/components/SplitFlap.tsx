import React, { AnimationEventHandler, CSSProperties, useState } from 'react';
import { charsBetween } from '../utils/chars-between';
import { randBetween } from '../utils/rand-between';
import styles from './SplitFlap.module.pcss';

interface SplitFlapProps {
  /**
   * The value to show on the final flip
   */
  value: string;
  /**
   * The value to start from
   */
  start?: string;

  /**
   * Additional classes
   * One of 'rainbow'
   */
  className?: string;

  /**
   * If true give a random speed and delay
   */
  random?: boolean;
}

const alphabet = [
  ...charsBetween('0', '9'),
  ...charsBetween('A', 'Z'),
  ...charsBetween('a', 'z'),
  ' ',
  ',',
  '.',
  '/',
  '!',
];

function getClassFromStyles(prettyClassName: string | undefined): string {
  if (!prettyClassName) return '';

  return styles[prettyClassName] || '';
}

export const SplitFlap = ({ start = alphabet[0], value, className, random = false }: SplitFlapProps) => {
  const actualClassName = getClassFromStyles(className);
  if (alphabet.indexOf(value) === -1) {
    return <FlipCard value={'ERR'} previousValue={'ERR'} className={actualClassName} />;
  }

  const firstStepIndex = alphabet.indexOf(start);
  const firstStep = alphabet[firstStepIndex + 1];

  const [current, setCurrent] = useState(firstStep);
  const [previous, setPrevious] = useState(start);

  const update = () => {
    if (current === value) {
      return;
    }

    setPrevious(current);
    const currentIndex = alphabet.indexOf(current);
    const next = alphabet[currentIndex + 1];
    setCurrent(next);
  };

  return (
    <>
      <FlipCard
        key={current}
        value={current}
        previousValue={previous}
        onAnimationEnd={() => update()}
        className={`${actualClassName}`}
        random={random}
      />
    </>
  );
};

type FlipCardProps = {
  /**
   * The card's previous value (behind)
   */
  previousValue: string;
  /**
   * The current card value
   */
  value: string;
  /**
   * If true give a random speed and delay
   */
  random?: boolean;
  /**
   * What to do when animation of one of the flipping cards ends
   */
  onAnimationEnd?: AnimationEventHandler;

  /**
   * Additional classes
   */
  className?: string;
};
const FlipCard = ({ previousValue, value, random = false, className, onAnimationEnd }: FlipCardProps) => {
  const style: CSSProperties = {};
  if (random) {
    style.animationDelay = `${randBetween(0, 0.1)}s`;
    style.animationDuration = `${randBetween(0.05, 0.2)}s`;
  }
  return (
    <div className={`${styles.container} ${className}`}>
      <Card className={`${styles['card-top']}`} value={value} />
      <Card className={`${styles['card-bottom']}`} value={previousValue} />
      <AnimatedCard
        className={`${styles.card} ${styles.fold}`}
        style={style}
        value={previousValue}
        onAnimationEnd={onAnimationEnd}
      />
      <AnimatedCard className={`${styles.card} ${styles.unfold}`} value={value} style={style} />
    </div>
  );
};

const AnimatedCard = ({ className, value, onAnimationEnd, style }: CardProps) => (
  <Card className={`${styles.card} ${className}`} value={value} onAnimationEnd={onAnimationEnd} style={style} />
);

type CardProps = {
  /**
   * The classes to apply to the card
   */
  className: string;
  /**
   * The value on the card
   */
  value: string;

  /**
   * What to do when animation ends
   */
  onAnimationEnd?: AnimationEventHandler;

  /**
   * Pass-through styles
   */
  style?: CSSProperties | undefined;
};
const Card = ({ className, value, onAnimationEnd, style }: CardProps) => {
  return (
    <div className={className} onAnimationEnd={onAnimationEnd} style={style}>
      <span>{value}</span>
    </div>
  );
};
