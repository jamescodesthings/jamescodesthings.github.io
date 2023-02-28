import { PaperPage } from '../layout/PaperPage';
import spacing from '../../styles/spacing.module.pcss';
import { BodyWithSidebar } from '../layout/BodyWithSidebar';
import { SidebarInterests } from '../content/SidebarInterests';
import { EducationHeading } from '../headings/EducationHeading';
import { EducationContent } from '../content/EducationContent';

export const Education = () => (
  <PaperPage className={`rounded-lg ${spacing.mb}`}>
    <BodyWithSidebar sidebar={<SidebarInterests />}>
      <EducationHeading />
      <EducationContent />
    </BodyWithSidebar>
  </PaperPage>
);
