import { PaperPage } from '../layout/PaperPage';
import spacing from '../../styles/spacing.module.pcss';
import { SkillsHeading } from '../headings/SkillsHeading';
import { SkillsContent } from '../content/SkillsContent';

export const Skills = () => (
  <PaperPage className={`rounded-lg ${spacing.mb} ${spacing.pall}`}>
    <SkillsHeading />
    <SkillsContent />
    {/*<BodyWithSidebar sidebar={<CenteredLabel title={`todo`} />}>*/}
    {/*</BodyWithSidebar>*/}
  </PaperPage>
);
