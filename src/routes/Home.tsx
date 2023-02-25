import { useContext, useEffect } from 'react';
import { Switch } from '../components/ui/Switch';
import { TitleWithBackground } from '../components/typography/TitleWithBackground';
import styles from './Home.module.pcss';
import utils from '../styles/utils.module.pcss';
import { persistChosenTheme, Theme, ThemeContext } from '../context/ThemeContext';
import { Jumbotron } from '../components/ui/Jumbotron';
import { SplitFlap } from '../components/ui/split-flap/SplitFlap';
import { Projects } from '../components/pages/Projects';
import { Education } from '../components/pages/Education';
import { Skills } from '../components/pages/Skills';
import { Experience } from '../components/pages/Experience';
import { CoverLetter } from '../components/pages/CoverLetter';

/**
 * Home
 * @description The main/home/landing page for codesthings.com
 * @todo pull theme stuff up if/when adding router
 */
export const Home = () => {
  const { state, dispatch } = useContext(ThemeContext);

  const changeDarkMode = (value: boolean) => {
    const newTheme = value ? Theme.Dark : Theme.Light;
    console.log('App Switch Changed Dark Mode: %s (%s)', value, newTheme);
    persistChosenTheme(newTheme);

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
      <div className={`${utils.contain} ${utils.screen}`}>
        <Jumbotron className={`jumbo-round`}>
          <main className={`${state} ${styles.main} h-full`}>
            <Switch
              value={isDark}
              onChange={changeDarkMode}
              className={`${styles.themeToolbar}`}
              textClass={`${styles.switchText}`}
            >
              Dark
            </Switch>
            <div className={`${styles.jumboMainContent}`}>
              <TitleWithBackground
                title={'James Macmillan'}
                gradient={'sublime'}
                className={`before:bg-gradient-to-bl`}
              />
              <div className={`${styles.splitFlapWrapper}`}>
                <SplitFlap value={'Senior'} className={'word-xs'} random={true} steps={7}></SplitFlap>
                <SplitFlap value={'Software'} className={'word-xs'} random={true} steps={7}></SplitFlap>
                <SplitFlap value={'Engineer'} className={'word-xs'} random={true} steps={7}></SplitFlap>
              </div>
            </div>
          </main>
        </Jumbotron>
      </div>

      <CoverLetter />
      <Experience />
      <Skills />
      <Education />
      <Projects />
    </>
  );
};

export default Home;
