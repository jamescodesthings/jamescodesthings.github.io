import { SidebarHeading } from '../headings/SidebarHeading';
import { PhoneIcon } from '../icons/PhoneIcon';
import { EmailIcon } from '../icons/EmailIcon';
import { AddressIcon } from '../icons/AddressIcon';
import { PropsWithClassName } from '../../types/PropsWithClassName';

export const ContactInfo = ({ className }: PropsWithClassName) => (
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