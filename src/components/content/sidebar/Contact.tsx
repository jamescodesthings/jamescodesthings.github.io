import { SidebarHeading } from '../../headings/SidebarHeading';
import PhoneIcon from '../../../assets/svg/jamicons/phone.svg';
import EmailIcon from '../../../assets/svg/jamicons/inbox.svg';
import AddressIcon from '../../../assets/svg/jamicons/home.svg';
import { PropsWithClassName } from '../../../types/PropsWithClassName';

export const Contact = ({ className }: PropsWithClassName) => (
  <section className={`print:hidden`}>
    {/*<h3 className={`${typography.sidebarHeading}`}>Contact</h3>*/}
    <SidebarHeading icon={<PhoneIcon />} title={'Phone'} className={className}>
      <a href="tel:+447736667115">+44 7736 667115</a>
    </SidebarHeading>
    <SidebarHeading icon={<EmailIcon />} title={'Email'} className={className}>
      <a href="mailto:james@codesthings.com">
        james
        <wbr />
        @codesthings.com
      </a>
    </SidebarHeading>
    <SidebarHeading icon={<AddressIcon />} title={'Address'} className={className}>
      <a href="mailto:james@codesthings.com">Midlands, UK.</a>
    </SidebarHeading>
  </section>
);
