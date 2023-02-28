import { SidebarHeading } from '../../headings/SidebarHeading';
import Icon from '../../../assets/svg/jamicons/user-circle.svg';
import spacing from '../../../styles/spacing.module.pcss';
import typography from '../../../styles/typography.module.pcss';
import { Profile as ProfileData } from '../../../data/Profile';

export const Profile = () => (
  <>
    <SidebarHeading title={`Profile`} icon={<Icon />} className={`!mb-px`} />
    <article className={`${typography.body}`}>
      {ProfileData.map((sentence, i) => (
        <p key={`profile-${i}`} className={`${spacing.mbHalf}`}>
          {sentence}
        </p>
      ))}
    </article>
  </>
);
