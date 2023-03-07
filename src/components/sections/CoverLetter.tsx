import { PaperPage } from '../layout/PaperPage';
import { BodyWithSidebar } from '../layout/BodyWithSidebar';
import { Avatar } from '../ui/Avatar';
import { Contact } from '../content/sidebar/Contact';
import { CoverLetterHeading } from '../headings/CoverLetterHeading';
import { CoverLetterContent } from '../content/body/CoverLetterContent';
import { Socials } from '../content/sidebar/Socials';
import { Availability } from '../content/sidebar/Availability';
import { Seeking } from '../content/sidebar/Seeking';
import spacing from '../../styles/spacing.module.pcss';
import typography from '../../styles/typography.module.pcss';

export const CoverLetter = () => (
  <PaperPage>
    <BodyWithSidebar
      sidebar={
        <>
          <Avatar />
          <Socials />
          <Contact />
          <Availability />
          <Seeking />
        </>
      }
    >
      <h1 className={`${typography.title} ${spacing.mtDouble}`}>James Macmillan</h1>
      <CoverLetterHeading />
      <CoverLetterContent />
    </BodyWithSidebar>
  </PaperPage>
);
