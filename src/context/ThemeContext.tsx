import { createContext, Dispatch, PropsWithChildren, useReducer } from 'react';

type ThemeContextType = {
  state?: Theme;
  dispatch?: Dispatch<Theme>;
};
export const ThemeContext = createContext<ThemeContextType>({});

export const LOCAL_STORAGE_KEY = 'theme-choice';

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

const themeReducer = (state: Theme, action: Theme) => {
  if (action === Theme.Dark) return Theme.Dark;

  return Theme.Light;
};

export const persistChosenTheme = (theme: Theme) => {
  try {
    if (typeof localStorage?.setItem !== 'function') {
      throw new Error('Local Storage not supported');
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, theme);
  } catch (error) {
    console.error(`Could not persistChosenTheme ${error}`);
  }
};

const getDefaultTheme: () => Theme = () => {
  // If the user has chosen, use their chosen theme
  const chosenTheme = localStorage?.getItem(LOCAL_STORAGE_KEY) as Theme;
  if (chosenTheme) {
    return chosenTheme;
  }

  // Default to system
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)')?.matches;
  if (defaultDark) return Theme.Dark;

  return Theme.Light;
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(themeReducer, getDefaultTheme());
  return <ThemeContext.Provider value={{ state, dispatch }}>{children}</ThemeContext.Provider>;
};
