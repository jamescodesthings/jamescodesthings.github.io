import { PaperPage } from '../layout/PaperPage';
import spacing from '../../styles/spacing.module.pcss';
import { BodyWithSidebar } from '../layout/BodyWithSidebar';
import { SidebarProfile } from '../content/SidebarProfile';
import { ExperienceHeading } from '../headings/ExperienceHeading';
import { ExperienceContent } from '../content/ExperienceContent';

export const Experience = () => (
  <PaperPage className={`rounded-lg ${spacing.mb}`}>
    <BodyWithSidebar sidebar={<SidebarProfile />}>
      <ExperienceHeading />
      <ExperienceContent />
    </BodyWithSidebar>
  </PaperPage>
);
