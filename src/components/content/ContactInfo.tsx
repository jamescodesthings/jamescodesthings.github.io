import { SidebarHeading } from '../headings/SidebarHeading';
import { PhoneIcon } from '../icons/PhoneIcon';
import { EmailIcon } from '../icons/EmailIcon';
import { AddressIcon } from '../icons/AddressIcon';

export const ContactInfo = () => (
  <section className={`print:hidden`}>
    {/*<h3 className={`${typography.sidebarHeading}`}>Contact</h3>*/}
    <SidebarHeading icon={<PhoneIcon />} title={'Phone'}>
      <a href="tel:+447736667115">+44 7736 667115</a>
    </SidebarHeading>
    <SidebarHeading icon={<EmailIcon />} title={'Email'}>
      <a href="mailto:james@codesthings.com">
        james
        <wbr />
        @codesthings.com
      </a>
    </SidebarHeading>
    <SidebarHeading icon={<AddressIcon />} title={'Address'}>
      <a href="mailto:james@codesthings.com">Midlands, UK.</a>
    </SidebarHeading>
  </section>
);
