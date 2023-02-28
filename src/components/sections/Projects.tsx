import { PaperPage } from '../layout/PaperPage';
import spacing from '../../styles/spacing.module.pcss';
import { BodyWithSidebar } from '../layout/BodyWithSidebar';
import { Stacks } from '../content/sidebar/Stacks';
import { ProjectsHeading } from '../headings/ProjectsHeading';
import { ProjectsContent } from '../content/body/ProjectsContent';

export const Projects = () => (
  <PaperPage className={`rounded-lg ${spacing.mb}`}>
    <BodyWithSidebar sidebar={<Stacks />}>
      <ProjectsHeading />
      <ProjectsContent />
    </BodyWithSidebar>
  </PaperPage>
);
