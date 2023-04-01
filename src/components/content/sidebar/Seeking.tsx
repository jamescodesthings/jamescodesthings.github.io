import { SidebarHeading } from '../../headings/SidebarHeading';
import Icon from '../../../assets/svg/glasses.svg';
import { PropsWithClassName } from '../../../types/PropsWithClassName';
import { useContext } from 'react';
import { SeekingContext } from '../../../context/SeekingContext';

export const Seeking = ({ className }: PropsWithClassName) => {
  const { isSeeking } = useContext(SeekingContext);
  if (isSeeking) {
    return (
      <SidebarHeading icon={<Icon />} title={'Seeking'} className={className}>
        <span>Full time, remote roles in the UK.</span>
      </SidebarHeading>
    );
  }

  return (
    <SidebarHeading icon={<Icon />} title={'Seeking'} className={className}>
      <span>Not actively seeking roles.</span>
    </SidebarHeading>
  );
};
