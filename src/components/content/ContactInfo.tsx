import spacing from '../../styles/spacing.module.pcss';
import typography from '../../styles/typography.module.pcss';
import { ContactHeading } from '../headings/ContactHeading';
import { PhoneIcon } from '../icons/PhoneIcon';
import { EmailIcon } from '../icons/EmailIcon';
import { AddressIcon } from '../icons/AddressIcon';

export const ContactInfo = () => (
  <section className={`print:hidden ${spacing.mall}`}>
    <h3 className={`${typography.sidebarHeading}`}>Contact</h3>
    <ContactHeading icon={<PhoneIcon />}>
      <h4 className={`${typography.accent}`}>Phone</h4>
      <a href="tel:+447736667115">+44 7736 667115</a>
    </ContactHeading>
    <ContactHeading icon={<EmailIcon />}>
      <h4 className={`${typography.accent}`}>Email</h4>
      <a href="mailto:james@codesthings.com">
        james
        <wbr />
        @codesthings.com
      </a>
    </ContactHeading>
    <ContactHeading icon={<AddressIcon />}>
      <h4 className={`${typography.accent}`}>Address</h4>
      <a href="mailto:james@codesthings.com">Midlands, UK.</a>
    </ContactHeading>
  </section>
);
