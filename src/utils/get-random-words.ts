import { faker } from '@faker-js/faker/locale/en_GB';

export type KnownMethods = 'adjective' | 'adverb' | 'conjunction' | 'interjection' | 'noun' | 'preposition' | 'verb';

/**
 * A copy of faker method's options
 */
type MethodOptions =
  | number
  | {
      length?:
        | number
        | {
            min: number;
            max: number;
          };
      strategy?: 'fail' | 'closest' | 'shortest' | 'longest' | 'any-length';
    };

type FakerMethod = (options: MethodOptions) => string;

const validate = (length = 5, count = 1, type = 'noun') => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const method = faker.word[type] as FakerMethod;

  if (!method || typeof method !== 'function') {
    throw new Error(`Cannot generate faker.word.${type}`);
  }

  if (length < 1) {
    throw new Error('Cannot generate zero length word');
  }

  if (count < 1) {
    throw new Error('Cannot generate less than one word');
  }
};

/**
 * Generates a random word of a particular type, with the same length as the first parameter
 * @param [length] The length of words to replace (default: 5)
 * @param [count] The number of words to generate (default: 1)
 * @param [type] The type of word to generate (default: noun)
 */
export const getRandomWords = (length = 5, count = 1, type: KnownMethods = 'noun') => {
  validate(length, count, type);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return new Array(count).fill('').map(() => faker.word[type]({ length }));
};

/**
 * Generates a random adjective, with the same length as the first parameter
 * @param toReplace The word that this could replace, staying the same size
 * @param [count] The number of words to generate (default: 1)
 */
export const getRandomAdjectives = (toReplace: string, count = 1) => {
  return getRandomWords(5, count, 'adjective');
};

/**
 * Generates a random noun, with the same length as the first parameter
 * @param toReplace The word that this could replace, staying the same size
 * @param [count] The number of words to generate (default: 1)
 */
export const getRandomNouns = (toReplace: string, count = 1) => {
  return getRandomWords(5, count, 'noun');
};
