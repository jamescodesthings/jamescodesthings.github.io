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
      <div className={`container m-auto relative ${spacing.py}`}>
        <Jumbotron className={'jumbo-round'}>
          <main className={`${state} ${styles.main} h-full`}>
            <Switch value={isDark} onChange={changeDarkMode} className={styles.themeToolbar}>
              Dark
            </Switch>
            {/*<img src={'/src/assets/favicon/favicon-dark-transparent.svg'} className={`w-24 m-4`} />*/}
            <div className={'flex flex-col justify-center items-center w-full h-full absolute top-0 left-0'}>
              <TitleWithBackground title={'James Macmillan'} className={'sunset to-tr m-4'} />
              <div className="row sm:flex flex-wrap w-full sm:w-auto m-4 p-4 sm:p-0">
                <SplitFlap value={'Senior'} className={'word-xs'} random={true} steps={10}></SplitFlap>
                <SplitFlap value={'Software'} className={'word-xs'} random={true} steps={10}></SplitFlap>
                <SplitFlap value={'Engineer'} className={'word-xs'} random={true} steps={10}></SplitFlap>
              </div>
            </div>
          </main>
        </Jumbotron>

        <PaperPage textureName={'textured-paper'} className={'rounded-lg'}>
          <div className={`${typography.headingWithIcon} m-4`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -5 24 24" width="24" fill="currentColor">
              <path d="M2 0h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v10h16V2H2zm3 6h6a1 1 0 0 1 0 2H5a1 1 0 1 1 0-2zm10-5h2v2h-2V3z"></path>
            </svg>
            <h1 className={`ml-4`}>Cover Letter</h1>
          </div>
          <article className="prose prose-stone dark:prose-invert lg:prose-lg xl:prose-xl">
            <p>
              Thank you for taking the time to look at my CV. I&apos;m James Macmillan, a Senior Full Stack Web and
              Mobile Developer based in the midlands, UK.
            </p>
            <p>I am currently seeking remote roles as a Senior, Principal or Lead Developer.</p>
            <p>
              My preferred stack is Node.js, microservice based but I&apos;m experienced with a multitude of tech stacks
              (see below). {/*todo: add anchor link*/}
            </p>
            <p>
              I started web development at 12 years old, and have worked in the industry for my whole adult life. My
              core web skills developed alongside the growth of web as a platform, and when every company needed a
              mobile app, I adapted my skills to cross platform mobile development.
            </p>
            <p>
              I have a strong passion for development, writing clean and maintainable code. I&apos;ve always had a love
              for web and mobile design, and I keep myself up to speed with the latest in development and design trends.
            </p>
            <p>
              I&apos;m currently working as a full stack web & mobile dev on a team with a .net core stack, but have
              also heavily used Node.js stacks. I&apos;m experienced with on-prem and cloud deployments, with
              significant experience in microservice development.
            </p>
            <p>Please take a look around, and get in touch if you&apos;re interested in hiring me.</p>
            <hr className="print:hidden" />
            <em>James Macmillan</em>
          </article>
        </PaperPage>
      </div>
    </>
  );
};
