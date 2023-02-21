import { pad } from 'lodash';
import { SplitFlap } from './SplitFlap';
import { PropsWithClassName } from '../../../types/PropsWithClassName';

type SplitFlapBoardProps = {
  /**
   * The word it should say
   */
  value: string;

  /**
   * If true give a random speed and delay
   */
  random?: boolean;

  /**
   * How many letters are in each column?
   */
  columns?: number;

  /**
   * How many letters are in each row?
   */
  rows?: number;

  /**
   * If true, one word per row
   */
  splitWords?: boolean;

  /**
   * If true center
   */

  center?: boolean;
};

function toWordsArray(value: string, center: boolean, rows: number) {
  let words = value.split(' ');

  if (center && words.length < rows) {
    const padding = Math.floor((rows - words.length) / 2);
    const final = [];

    for (let i = 0; i < padding; i++) {
      final[i] = ' ';
    }

    for (let i = 0; i < words.length; i++) {
      final[padding + i] = words[i];
    }

    words = final;
  }
  return words;
}

function toSplitWordDisplay(value: string, center: boolean, rows: number, columns: number) {
  const result: string[][] = [];
  const words = toWordsArray(value, center, rows);
  for (let row = 0; row < rows; row++) {
    const word = center ? pad(words[row], columns) : words[row];

    result[row] = [];
    for (let column = 0; column < columns; column++) {
      result[row][column] = word[column] || ' ';
    }
  }

  return result;
}

function toInlineDisplay(center: boolean, value: string, rows: number, columns: number) {
  const result: string[][] = [];
  const str = center ? pad(value, rows * columns) : value;

  for (let row = 0; row < rows; row++) {
    result[row] = [];
    for (let column = 0; column < columns; column++) {
      const index = row * columns + column;
      result[row][column] = str[index] || ' ';
    }
  }
  return result;
}

/**
 * Goes from a string to a logical form of the final display (each row & character as an array)
 * @param rows The number of rows
 * @param columns The number of columns
 * @param value The value to convert
 * @param splitWords If true, one word per line
 * @param center If true, center vertically & horizontally
 */
function toDisplay(rows: number, columns: number, value: string, splitWords = false, center = false): string[][] {
  if (splitWords) {
    return toSplitWordDisplay(value, center, rows, columns);
  }
  return toInlineDisplay(center, value, rows, columns);
}

export const SplitFlapBoard = ({
  value,
  className,
  random = false,
  columns = 8,
  rows = 2,
  splitWords = false,
  center = false,
}: PropsWithClassName<SplitFlapBoardProps>) => {
  if (!value) {
    throw new Error('Cannot be empty');
  }

  if (columns < 1 || rows < 1) {
    throw new Error('Cannot be zero or negative');
  }

  const logicalDisplay = toDisplay(rows, columns, value, splitWords, center);

  return (
    <>
      <div className="split-flap-board">
        {logicalDisplay.map((row, r) => (
          <div key={`${r}`} className="flex justify-center align-center">
            {row.map((column, c) => (
              <SplitFlap key={`${r}${c}`} value={column} className={className} random={random} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
