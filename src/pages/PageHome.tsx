import { useContext, useEffect } from 'react';
import { Switch } from '../components/inputs/Switch';
import { TitleWithBackground } from '../components/typography/TitleWithBackground';
import styles from './PageHome.module.pcss';
import { Theme, ThemeContext } from '../context/ThemeContext';
import { Jumbotron } from '../components/visual/Jumbotron';
import { SplitFlap } from '../components/split-flap/SplitFlap';

export const PageHome = () => {
  const { state, dispatch } = useContext(ThemeContext);

  const changeDarkMode = (value: boolean) => {
    const newTheme = value ? Theme.Dark : Theme.Light;
    console.log('App Switch Changed Dark Mode: %s (%s)', value, newTheme);

    if (dispatch) dispatch(newTheme);
  };

  const isDark = state === Theme.Dark;

  useEffect(() => {
    if (isDark) {
      document.body.className = Theme.Dark;
    } else {
      document.body.className = Theme.Light;
    }
  }, [isDark]);

  return (
    <>
      <Switch value={isDark} onChange={changeDarkMode} className={styles['theme-toolbar']}>
        Dark
      </Switch>

      <Jumbotron className={'jumbo-round'}>
        <main className={`${state} ${styles.main} h-full`}>
          {/*<img src={'/src/assets/favicon/favicon-dark-transparent.svg'} className={`w-24 m-4`} />*/}
          <div className={'flex flex-col justify-center items-center w-full h-full absolute top-0 left-0'}>
            <TitleWithBackground title={'James Macmillan'} className={'hyper to-tr'} />
            <div className="row sm:flex flex-wrap">
              <SplitFlap value={'Senior'} className={'word-xs'} random={true} steps={10}></SplitFlap>
              <SplitFlap value={'Software'} className={'word-xs'} random={true} steps={10}></SplitFlap>
              <SplitFlap value={'Engineer'} className={'word-xs'} random={true} steps={10}></SplitFlap>
            </div>
          </div>
        </main>
      </Jumbotron>
    </>
  );
};
