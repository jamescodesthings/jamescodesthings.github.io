import { PaperPage } from '../layout/PaperPage';
import { SkillsHeading } from '../headings/SkillsHeading';
import { SkillsContent } from '../content/body/SkillsContentNew';
import { BodyWithSidebar } from '../layout/BodyWithSidebar';
import { Stacks } from '../content/sidebar/Stacks';
import { EducationHeading } from '../headings/EducationHeading';
import { EducationContent } from '../content/body/EducationContent';
import { Interests } from '../content/sidebar/Interests';

export const Skills = () => (
  <PaperPage>
    <BodyWithSidebar
      sidebar={
        <>
          <Stacks />
          <Interests />
        </>
      }
    >
      <SkillsHeading />
      <SkillsContent />
      <EducationHeading />
      <EducationContent />
    </BodyWithSidebar>
  </PaperPage>
);
