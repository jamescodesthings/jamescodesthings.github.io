import { SidebarHeading } from '../../headings/SidebarHeading';
import Icon from '../../../assets/svg/jamicons/watch.svg';
import { PropsWithClassName } from '../../../types/PropsWithClassName';

export const Availability = () => (
  <SidebarHeading icon={<Icon />} title={'Availability'}>
    <span>Immediate</span>
  </SidebarHeading>
);
