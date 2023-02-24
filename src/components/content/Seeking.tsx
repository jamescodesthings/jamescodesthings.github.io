import { SidebarHeading } from '../headings/SidebarHeading';
import Icon from '../../assets/svg/glasses.svg';
import { PropsWithClassName } from '../../types/PropsWithClassName';

export const Seeking = ({ className }: PropsWithClassName) => (
  <SidebarHeading icon={<Icon />} title={'Seeking'} className={className}>
    <span>Full time, remote roles in the UK.</span>
  </SidebarHeading>
);
