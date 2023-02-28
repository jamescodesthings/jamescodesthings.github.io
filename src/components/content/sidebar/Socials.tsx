import { SidebarHeading } from '../../headings/SidebarHeading';
import { PropsWithClassName } from '../../../types/PropsWithClassName';
import { DevIcon } from '../../ui/DevIcon';

export const Socials = ({ className }: PropsWithClassName) => (
  <section className={`print:hidden`}>
    <SidebarHeading icon={<DevIcon icon={`devicon-linkedin-plain`} />} className={className}>
      James Macmillan
    </SidebarHeading>
  </section>
);
