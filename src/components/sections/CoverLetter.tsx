import { PaperPage } from '../layout/PaperPage';
import spacing from '../../styles/spacing.module.pcss';
import { BodyWithSidebar } from '../layout/BodyWithSidebar';
import { Avatar } from '../ui/Avatar';
import { Contact } from '../content/sidebar/Contact';
import { Availability } from '../content/sidebar/Availability';
import { Seeking } from '../content/sidebar/Seeking';
import { CoverLetterHeading } from '../headings/CoverLetterHeading';
import { CoverLetterContent } from '../content/body/CoverLetterContent';
import { Socials } from '../content/sidebar/Socials';

export const CoverLetter = () => (
  <PaperPage className={`rounded-lg ${spacing.mb}`}>
    <BodyWithSidebar
      sidebar={
        <>
          <Avatar />
          <Contact />
          <Socials />
        </>
      }
    >
      <CoverLetterHeading />
      <CoverLetterContent />
    </BodyWithSidebar>
  </PaperPage>
);
