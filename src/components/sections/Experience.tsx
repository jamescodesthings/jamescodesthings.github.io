import { PaperPage } from '../layout/PaperPage';
import { BodyWithSidebar } from '../layout/BodyWithSidebar';
import { Profile } from '../content/sidebar/Profile';
import { ExperienceHeading } from '../headings/ExperienceHeading';
import { ExperienceContent } from '../content/body/ExperienceContent';
import { Availability } from '../content/sidebar/Availability';
import { Seeking } from '../content/sidebar/Seeking';
import spacing from '../../styles/spacing.module.pcss';

export const Experience = () => (
  <PaperPage className={`rounded-lg ${spacing.mb}`}>
    <BodyWithSidebar
      sidebar={
        <>
          <div className={`${spacing.mtDouble}`}>
            <Availability />
            <Seeking />
            <Profile />
          </div>
        </>
      }
    >
      <ExperienceHeading />
      <ExperienceContent />
    </BodyWithSidebar>
  </PaperPage>
);
