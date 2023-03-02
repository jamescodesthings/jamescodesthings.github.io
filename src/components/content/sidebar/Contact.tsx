import { SidebarHeading } from '../../headings/SidebarHeading';
import PhoneIcon from '../../../assets/svg/jamicons/phone.svg';
import EmailIcon from '../../../assets/svg/jamicons/inbox.svg';
import AddressIcon from '../../../assets/svg/jamicons/home.svg';
import typography from '../../../styles/typography.module.pcss';

export const Contact = () => (
  <section className={`print:hidden`}>
    <SidebarHeading icon={<PhoneIcon />} title={'Phone'}>
      <a href="tel:+447736667115" className={`${typography.externalLink}`} target="_blank" rel="noreferrer">
        +44 7736 667115
      </a>
    </SidebarHeading>
    <SidebarHeading icon={<EmailIcon />} title={'Email'}>
      <a href="mailto:james@codesthings.com" className={`${typography.externalLink}`} target="_blank" rel="noreferrer">
        james
        <wbr />
        @codesthings.com
      </a>
    </SidebarHeading>
    <SidebarHeading icon={<AddressIcon />} title={'Address'}>
      Midlands, UK.
    </SidebarHeading>
  </section>
);
