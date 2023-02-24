import { Prose } from '../typography/Prose';
import { SidebarHeading } from '../headings/SidebarHeading';
import Icon from '../../assets/svg/jamicons/user-circle.svg';
import spacing from '../../styles/spacing.module.pcss';
import { Profile } from './data/Profile';

export const SidebarProfile = () => (
  <>
    <section className={`${spacing.mtDouble}`}>
      <SidebarHeading title={`Profile`} icon={<Icon />} className={`${spacing.mbHalf}`} />
      <Prose>
        {Profile.map((sentence, i) => (
          <p key={`profile-${i}`}>{sentence}.</p>
        ))}
      </Prose>
    </section>
  </>
);
