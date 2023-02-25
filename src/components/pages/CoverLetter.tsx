import { PaperPage } from '../layout/PaperPage';
import spacing from '../../styles/spacing.module.pcss';
import { BodyWithSidebar } from '../layout/BodyWithSidebar';
import { Avatar } from '../ui/Avatar';
import { ContactInfo } from '../content/ContactInfo';
import { Availability } from '../content/Availability';
import { Seeking } from '../content/Seeking';
import { CoverLetterHeading } from '../headings/CoverLetterHeading';
import { CoverLetterContent } from '../content/CoverLetterContent';

export const CoverLetter = () => (
  <PaperPage className={`rounded-lg ${spacing.mb}`}>
    <BodyWithSidebar
      sidebar={
        <>
          <Avatar />
          <ContactInfo />
          <Availability />
          <Seeking />
        </>
      }
    >
      <CoverLetterHeading />
      <CoverLetterContent />
    </BodyWithSidebar>
  </PaperPage>
);
