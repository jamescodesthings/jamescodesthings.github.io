import { PaperPage } from '../layout/PaperPage';
import spacing from '../../styles/spacing.module.pcss';
import { SkillsHeading } from '../headings/SkillsHeading';
import { SkillsContent } from '../content/body/SkillsContentNew';
import { BodyWithSidebar } from '../layout/BodyWithSidebar';
import { Stacks } from '../content/sidebar/Stacks';

export const Skills = () => (
  <PaperPage className={`rounded-lg ${spacing.mb} ${spacing.pall}`}>
    <BodyWithSidebar sidebar={<Stacks />}>
      <SkillsHeading />
      <SkillsContent />
    </BodyWithSidebar>
  </PaperPage>
);
