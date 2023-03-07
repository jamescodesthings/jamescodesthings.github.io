import { PaperPage } from '../layout/PaperPage';
import { BodyWithSidebar } from '../layout/BodyWithSidebar';
import { Profile } from '../content/sidebar/Profile';
import { ExperienceHeading } from '../headings/ExperienceHeading';
import { ExperienceContent } from '../content/body/ExperienceContent';
import spacing from '../../styles/spacing.module.pcss';
import { Download } from '../content/sidebar/Download';

export const Experience = () => (
  <PaperPage>
    <BodyWithSidebar
      sidebar={
        <>
          <div className={`${spacing.mtDouble}`}>
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
