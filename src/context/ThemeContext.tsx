import { createContext, Dispatch, DispatchWithoutAction, PropsWithChildren, ReducerStateWithoutAction, useReducer } from 'react';

type ThemeContextType = {
  state?: Theme;
  dispatch?: Dispatch<Theme>;
};
export const ThemeContext = createContext<ThemeContextType>({});

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

const themeReducer = (state: Theme, action: Theme) => {
  if (action === Theme.Dark) return Theme.Dark;

  return Theme.Light;
};

const getDefaultTheme = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)')?.matches;
  if (defaultDark) return Theme.Dark;

  return Theme.Light;
};

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(themeReducer, getDefaultTheme());
  return <ThemeContext.Provider value={{ state, dispatch }}>{children}</ThemeContext.Provider>;
};
