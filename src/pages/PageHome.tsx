import { useContext } from 'react';
import { Switch } from '../components/Switch';
import { Title } from '../components/Title';
import styles from './PageHome.module.pcss';
import { Theme, ThemeContext } from '../context/ThemeContext';

export const PageHome = () => {
  const { state, dispatch } = useContext(ThemeContext);

  const changeDarkMode = (value: boolean) => {
    const newTheme = value ? Theme.Dark : Theme.Light;
    console.log('App Switch Changed Dark Mode: %s (%s)', value, newTheme);

    if (dispatch) dispatch(newTheme);
  };

  const isDark = state === Theme.Dark;

  return (
    <>
      <Switch value={isDark} onChange={changeDarkMode} className={styles['theme-toolbar']}>
        Dark
      </Switch>

      <main className={`${state} ${styles.main}`}>
        <Title title="James Macmillan" subtitle="Senior Software Developer" />
      </main>
    </>
  );
};
