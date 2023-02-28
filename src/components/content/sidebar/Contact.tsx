import { SidebarHeading } from '../../headings/SidebarHeading';
import PhoneIcon from '../../../assets/svg/jamicons/phone.svg';
import EmailIcon from '../../../assets/svg/jamicons/inbox.svg';
import AddressIcon from '../../../assets/svg/jamicons/home.svg';
import { PropsWithClassName } from '../../../types/PropsWithClassName';
import typography from '../../../styles/typography.module.pcss';

export const Contact = ({ className }: PropsWithClassName) => (
  <section className={`print:hidden`}>
    <SidebarHeading icon={<PhoneIcon />} title={'Phone'} className={className}>
      <a href="tel:+447736667115" className={`${typography.externalLink}`}>
        +44 7736 667115
      </a>
    </SidebarHeading>
    <SidebarHeading icon={<EmailIcon />} title={'Email'} className={className}>
      <a href="mailto:james@codesthings.com" className={`${typography.externalLink}`}>
        james
        <wbr />
        @codesthings.com
      </a>
    </SidebarHeading>
    <SidebarHeading icon={<AddressIcon />} title={'Address'} className={className}>
      Midlands, UK.
    </SidebarHeading>
  </section>
);
