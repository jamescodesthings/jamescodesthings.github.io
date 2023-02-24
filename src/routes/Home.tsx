import { useContext, useEffect } from 'react';
import { Switch } from '../components/ui/Switch';
import { TitleWithBackground } from '../components/typography/TitleWithBackground';
import styles from './Home.module.pcss';
import spacing from '../styles/spacing.module.pcss';
import utils from '../styles/utils.module.pcss';
import { persistChosenTheme, Theme, ThemeContext } from '../context/ThemeContext';
import { Jumbotron } from '../components/ui/Jumbotron';
import { SplitFlap } from '../components/ui/split-flap/SplitFlap';
import { PaperPage } from '../components/layout/PaperPage';
import { CoverLetterContent } from '../components/content/CoverLetterContent';
import { BodyWithSidebar } from '../components/layout/BodyWithSidebar';
import { CoverLetterHeading } from '../components/headings/CoverLetterHeading';
import { ExperienceHeading } from '../components/headings/ExperienceHeading';
import { ExperienceContent } from '../components/content/ExperienceContent';
import { SkillsHeading } from '../components/headings/SkillsHeading';
import { SkillsContent } from '../components/content/SkillsContent';
import { ProjectsHeading } from '../components/headings/ProjectsHeading';
import { ProjectsContent } from '../components/content/ProjectsContent';
import { Avatar } from '../components/ui/Avatar';
import { ContactInfo } from '../components/content/ContactInfo';
import { Availability } from '../components/content/Availability';
import { Seeking } from '../components/content/Seeking';
import { SidebarProfile } from '../components/content/SidebarProfile';
import { SidebarInterests } from '../components/content/SidebarInterests';
import { SidebarStacks } from '../components/content/SidebarStacks';
import { CenteredLabel } from '../components/utils/Label';
import { EducationHeading } from '../components/headings/EducationHeading';
import { EducationContent } from '../components/content/EducationContent';

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
      <div className={`${utils.contain}`}>
        <PaperPage className={`rounded-lg ${spacing.mb}`}>
          <BodyWithSidebar
            sidebar={
              <>
                <Avatar />
                <ContactInfo />
                <Availability />
                <Seeking />
              </>
            }
          >
            <CoverLetterHeading />
            <CoverLetterContent />
          </BodyWithSidebar>
        </PaperPage>
        <PaperPage className={`rounded-lg ${spacing.mb}`}>
          <BodyWithSidebar sidebar={<SidebarProfile />}>
            <ExperienceHeading />
            <ExperienceContent />
          </BodyWithSidebar>
        </PaperPage>
        <PaperPage className={`rounded-lg ${spacing.mb} ${spacing.pall}`}>
          <SkillsHeading />
          <SkillsContent />
          {/*<BodyWithSidebar sidebar={<CenteredLabel title={`todo`} />}>*/}
          {/*</BodyWithSidebar>*/}
        </PaperPage>
        <PaperPage className={`rounded-lg ${spacing.mb}`}>
          <BodyWithSidebar sidebar={<CenteredLabel title={'Todo'} />}>
            <EducationHeading />
            <EducationContent />
          </BodyWithSidebar>
        </PaperPage>
        <PaperPage className={`rounded-lg ${spacing.mb}`}>
          <BodyWithSidebar
            sidebar={
              <>
                <SidebarInterests />
                <SidebarStacks />
              </>
            }
          >
            <ProjectsHeading />
            <ProjectsContent />
          </BodyWithSidebar>
        </PaperPage>
      </div>
    </>
  );
};

export default Home;
