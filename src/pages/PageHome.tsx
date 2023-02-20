import { useContext, useEffect } from 'react';
import { Switch } from '../components/inputs/Switch';
import { TitleWithBackground } from '../components/typography/TitleWithBackground';
import styles from './PageHome.module.pcss';
import typography from '../styles/typography.module.pcss';
import spacing from '../styles/spacing.module.pcss';
import { persistChosenTheme, Theme, ThemeContext } from '../context/ThemeContext';
import { Jumbotron } from '../components/visual/Jumbotron';
import { SplitFlap } from '../components/split-flap/SplitFlap';
import { PaperPage } from '../components/visual/PaperPage';
import { CoverLetterHeading } from '../components/typography/PageHeadings';
import { CoverLetterContents } from './Contents/CoverLetterContents';

/**
 * PageHome
 * @description The main/home/landing page for codesthings.com
 * @todo pull theme stuff up if/when adding router
 */
export const PageHome = () => {
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
      <div className={`container m-auto relative ${spacing.py} ${spacing.pxHalf}`}>
        <Jumbotron className={`jumbo-round ${spacing.mb}`}>
          <main className={`${state} ${styles.main} h-full`}>
            <Switch value={isDark} onChange={changeDarkMode} className={styles.themeToolbar}>
              Dark
            </Switch>
            <div className={`${styles.jumboMainContent}`}>
              <TitleWithBackground title={'James Macmillan'} className={`sunset to-tr`} />
              <div className={`${styles.splitFlapWrapper} ${spacing.mall} ${spacing.pall}`}>
                <SplitFlap value={'Senior'} className={'word-xs'} random={true} steps={7}></SplitFlap>
                <SplitFlap value={'Software'} className={'word-xs'} random={true} steps={7}></SplitFlap>
                <SplitFlap value={'Engineer'} className={'word-xs'} random={true} steps={7}></SplitFlap>
              </div>
            </div>
          </main>
        </Jumbotron>

        <PaperPage textureName={'textured-paper'} className={'rounded-lg'}>
          <CoverLetterHeading />
          <CoverLetterContents />
        </PaperPage>
      </div>
    </>
  );
};
