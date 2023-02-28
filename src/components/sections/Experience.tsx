import { PaperPage } from '../layout/PaperPage';
import spacing from '../../styles/spacing.module.pcss';
import { BodyWithSidebar } from '../layout/BodyWithSidebar';
import { Profile } from '../content/sidebar/Profile';
import { ExperienceHeading } from '../headings/ExperienceHeading';
import { ExperienceContent } from '../content/body/ExperienceContent';
import { Availability } from '../content/sidebar/Availability';
import { Seeking } from '../content/sidebar/Seeking';

export const Experience = () => (
  <PaperPage className={`rounded-lg ${spacing.mb}`}>
    <BodyWithSidebar
      sidebar={
        <>
          <Availability />
          <Seeking />
          <Profile />
        </>
      }
    >
      <ExperienceHeading />
      <ExperienceContent />
    </BodyWithSidebar>
  </PaperPage>
);
