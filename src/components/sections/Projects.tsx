import { PaperPage } from '../layout/PaperPage';
import { BodyWithSidebar } from '../layout/BodyWithSidebar';
import { Stacks } from '../content/sidebar/Stacks';
import { ProjectsHeading } from '../headings/ProjectsHeading';
import { ProjectsContent } from '../content/body/ProjectsContent';

export const Projects = () => (
  <PaperPage>
    <BodyWithSidebar sidebar={<Stacks />}>
      <ProjectsHeading />
      <ProjectsContent />
    </BodyWithSidebar>
  </PaperPage>
);
