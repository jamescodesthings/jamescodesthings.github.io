import { SidebarHeading } from '../headings/SidebarHeading';
import { SeekingIcon } from '../icons/SeekingIcon';
import { PropsWithClassName } from '../../types/PropsWithClassName';

export const Seeking = ({ className }: PropsWithClassName) => (
  <SidebarHeading icon={<SeekingIcon />} title={'Seeking'} className={className}>
    <span>Full time, remote roles in the UK.</span>
  </SidebarHeading>
);
