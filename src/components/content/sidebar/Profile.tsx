import { SidebarHeading } from '../../headings/SidebarHeading';
import spacing from '../../../styles/spacing.module.pcss';
import typography from '../../../styles/typography.module.pcss';
import { Profile as ProfileData } from '../../../data/Profile';

export const Profile = () => (
  <>
    <SidebarHeading title={`Profile`} className={`!mb-px`} />
    <article className={`${typography.body}`}>
      {ProfileData.map((sentence, i) => (
        <p key={`profile-${i}`} className={`${spacing.mbHalf}`}>
          {sentence}
        </p>
      ))}
    </article>
  </>
);
