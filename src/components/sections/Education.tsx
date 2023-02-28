import { PaperPage } from '../layout/PaperPage';
import spacing from '../../styles/spacing.module.pcss';
import { BodyWithSidebar } from '../layout/BodyWithSidebar';
import { Interests } from '../content/sidebar/Interests';
import { EducationHeading } from '../headings/EducationHeading';
import { EducationContent } from '../content/body/EducationContent';

export const Education = () => (
  <PaperPage className={`rounded-lg ${spacing.mb}`}>
    <BodyWithSidebar sidebar={<Interests />}>
      <EducationHeading />
      <EducationContent />
    </BodyWithSidebar>
  </PaperPage>
);
