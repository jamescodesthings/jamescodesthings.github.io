import { useContext } from 'react';
import { persistChosenTheme, Theme, ThemeContext } from '../../context/ThemeContext';
import { Switch } from './Switch';
import { PropsWithClassName } from '../../types/PropsWithClassName';
import styles from './DarkModeSwitch.module.pcss';

export const DarkModeSwitch = ({ className }: PropsWithClassName) => {
  const { state, dispatch } = useContext(ThemeContext);

  const changeDarkMode = (value: boolean) => {
    const newTheme = value ? Theme.Dark : Theme.Light;
    persistChosenTheme(newTheme);

    if (dispatch) dispatch(newTheme);
  };

  const isDark = state === Theme.Dark;

  return (
    <Switch
      value={isDark}
      onChange={value => changeDarkMode(value)}
      className={`${styles.themeToolbar} ${className}`}
      textClass={`${styles.switchText}`}
    >
      Dark
    </Switch>
  );
};
