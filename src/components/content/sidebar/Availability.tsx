import { SidebarHeading } from '../../headings/SidebarHeading';
import Icon from '../../../assets/svg/jamicons/watch.svg';
import { PropsWithClassName } from '../../../types/PropsWithClassName';

export const Availability = ({ className }: PropsWithClassName) => (
  <SidebarHeading icon={<Icon />} title={'Availability'} className={className}>
    <span>Immediate</span>
  </SidebarHeading>
);
