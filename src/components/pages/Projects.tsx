import { PaperPage } from '../layout/PaperPage';
import spacing from '../../styles/spacing.module.pcss';
import { BodyWithSidebar } from '../layout/BodyWithSidebar';
import { SidebarStacks } from '../content/SidebarStacks';
import { ProjectsHeading } from '../headings/ProjectsHeading';
import { ProjectsContent } from '../content/ProjectsContent';

export const Projects = () => (
  <PaperPage className={`rounded-lg ${spacing.mb}`}>
    <BodyWithSidebar sidebar={<SidebarStacks />}>
      <ProjectsHeading />
      <ProjectsContent />
    </BodyWithSidebar>
  </PaperPage>
);
