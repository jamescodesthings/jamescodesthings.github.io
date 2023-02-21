import { SplitFlap } from './SplitFlap';
import { PropsWithClassName } from '../../../types/PropsWithClassName';

type SplitFlapWordProps = {
  /**
   * The word it should say
   */
  value: string;

  /**
   * If true give a random speed and delay
   */
  random?: boolean;
};
export const SplitFlapWord = ({ value, className, random = false }: PropsWithClassName<SplitFlapWordProps>) => {
  return (
    <>
      <div className="word-container flex justify-center align-center flex-wrap">
        {value.split('').map((v, i) => (
          <SplitFlap key={i} value={v} className={className} random={random} />
        ))}
      </div>
    </>
  );
};
