import { useContext } from 'react';
import { Switch } from '../components/inputs/Switch';
import { TitleWithBackground } from '../components/typography/TitleWithBackground';
import styles from './PageHome.module.pcss';
import { Theme, ThemeContext } from '../context/ThemeContext';
import { Jumbotron } from '../components/visual/Jumbotron';

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

      <Jumbotron className={'jumbo-round'}>
        <main className={`${state} ${styles.main}`}>
          <TitleWithBackground title={'James Macmillan'} className={'hyper to-tr'} />
        </main>
      </Jumbotron>
    </>
  );
};
