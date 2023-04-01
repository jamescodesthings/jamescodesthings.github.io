import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { SeekingContext } from './context/SeekingContext';
import { IS_SEEKING } from './config';

export const ThemedApp = () => (
  <ThemeProvider>
    <SeekingContext.Provider value={{ isSeeking: IS_SEEKING }}>
      <App />
    </SeekingContext.Provider>
  </ThemeProvider>
);
