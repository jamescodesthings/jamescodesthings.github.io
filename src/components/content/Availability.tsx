import { SidebarHeading } from '../headings/SidebarHeading';
import { AvailabilityIcon } from '../icons/AvailabilityIcon';
import typography from '../../styles/typography.module.pcss';
import spacing from '../../styles/spacing.module.pcss';

export const Availability = () => (
  <section className={` ${spacing.mall} mr-0`}>
    <SidebarHeading icon={<AvailabilityIcon />} title={'Availability'}>
      <span>I am available now, with a one month notice period.</span>
    </SidebarHeading>
  </section>
);
