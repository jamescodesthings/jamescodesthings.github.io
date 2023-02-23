import React, { AnimationEventHandler, CSSProperties, useState } from 'react';
import { charsBetween } from '../../../utils/chars-between';
import { randBetween } from '../../../utils/rand-between';
import styles from './SplitFlap.module.pcss';
import { getRandomWords, KnownMethods } from '../../../utils/get-random-words';
import startCase from 'lodash/startCase';
import { getClassFromStyles } from '../../../utils/get-class-from-styles';
import { PropsWithClassName } from '../../../types/PropsWithClassName';

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
   * If true give a random speed and delay
   */
  random?: boolean;

  /**
   * If provided, the number of steps before reaching value
   */
  steps?: number;

  /**
   * If provided, the type of word to use, if not; noun.
   */
  type?: KnownMethods;
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

function getDictionary(value = '', length = 5, start = '', steps = 5, type: KnownMethods = 'noun') {
  let result: string[] = [];

  if (start) result = [start];

  const randomWords = getRandomWords(length, steps, type).map(word => startCase(word));
  result = [...result, ...randomWords];

  result = [...result, value];

  return result;
}

function getAlphabet(value: string, start: string | undefined, steps = Infinity) {
  const end = alphabet.indexOf(value);
  let startIndex = start ? alphabet.indexOf(start) : 0;
  if (end - startIndex > steps) {
    startIndex = end - steps;
  }

  return alphabet.slice(startIndex, end + 1);
}

export const SplitFlap = ({
  value,
  className,
  start,
  steps,
  type,
  random = false,
}: PropsWithClassName<SplitFlapProps>) => {
  const actualClassName = getClassFromStyles(styles, className);

  const emptyDict: string[] = [];
  const [dictionary, setDictionary] = useState(emptyDict);
  const [current, setCurrent] = useState('');
  const [previous, setPrevious] = useState('');

  const update = () => {
    if (current === value) {
      return;
    }

    setPrevious(current);
    const currentIndex = dictionary.indexOf(current);
    const next = dictionary[currentIndex + 1];
    setCurrent(next);
  };

  if (dictionary.length === 0) {
    if (alphabet.indexOf(value) === -1) {
      // Treat as a full english word.
      setDictionary(getDictionary(value, value?.length, start, steps, type));
    } else {
      setDictionary(getAlphabet(value, start, steps));
    }
  }

  if (!current && !previous) {
    setCurrent(dictionary[1]);
    setPrevious(dictionary[0]);
  }

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
    style.animationDuration = `${randBetween(0.3, 0.65)}s`;
  }
  return (
    <div className={`${styles.container} ${className}`}>
      <Card className={`${styles.cardTop}`} value={value} />
      <Card className={`${styles.cardBottom}`} value={previousValue} />
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

const AnimatedCard = ({ className, value, onAnimationEnd, style }: PropsWithClassName<CardProps>) => (
  <Card className={`${styles.card} ${className}`} value={value} onAnimationEnd={onAnimationEnd} style={style} />
);

type CardProps = {
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
const Card = ({ className, value, onAnimationEnd, style }: PropsWithClassName<CardProps>) => {
  return (
    <div className={className} onAnimationEnd={onAnimationEnd} style={style}>
      <span>{value}</span>
    </div>
  );
};
