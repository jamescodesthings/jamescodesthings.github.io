import { PaperPage } from '../layout/PaperPage';
import spacing from '../../styles/spacing.module.pcss';
import { BodyWithSidebar } from '../layout/BodyWithSidebar';
import { Avatar } from '../ui/Avatar';
import { Contact } from '../content/sidebar/Contact';
import { CoverLetterHeading } from '../headings/CoverLetterHeading';
import { CoverLetterContent } from '../content/body/CoverLetterContent';
import { Socials } from '../content/sidebar/Socials';

export const CoverLetter = () => (
  <PaperPage className={`rounded-lg ${spacing.mb}`}>
    <BodyWithSidebar
      sidebar={
        <>
          <Avatar />
          <Socials />
          <Contact />
        </>
      }
    >
      <CoverLetterHeading />
      <CoverLetterContent />
    </BodyWithSidebar>
  </PaperPage>
);
