import { SidebarHeading } from '../headings/SidebarHeading';
import { AvailabilityIcon } from '../icons/AvailabilityIcon';
import { PropsWithClassName } from '../../types/PropsWithClassName';

export const Availability = ({ className }: PropsWithClassName) => (
  <section className={``}>
    <SidebarHeading icon={<AvailabilityIcon />} title={'Availability'} className={className}>
      <span>Immediate</span>
    </SidebarHeading>
  </section>
);
