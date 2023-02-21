import { SidebarHeading } from '../headings/SidebarHeading';
import spacing from '../../styles/spacing.module.pcss';
import { SeekingIcon } from '../icons/SeekingIcon';

export const Seeking = () => (
  <section className={` ${spacing.mall} mr-0`}>
    <SidebarHeading icon={<SeekingIcon />} title={'Seeking'}>
      <span>Full time, remote roles in the UK.</span>
    </SidebarHeading>
  </section>
);
