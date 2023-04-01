import { createContext } from 'react';

type SeekingContextType = {
  isSeeking: boolean;
};
export const SeekingContext = createContext<SeekingContextType>({ isSeeking: true });
