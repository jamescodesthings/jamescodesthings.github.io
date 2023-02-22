import { SidebarHeading } from '../headings/SidebarHeading';
import { AvailabilityIcon } from '../icons/AvailabilityIcon';
import spacing from '../../styles/spacing.module.pcss';

export const Availability = () => (
  <section className={``}>
    <SidebarHeading icon={<AvailabilityIcon />} title={'Availability'}>
      <span>Immediate</span>
    </SidebarHeading>
  </section>
);
