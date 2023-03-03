import App from './App';
import { ThemeProvider } from './context/ThemeContext';

export const ThemedApp = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
