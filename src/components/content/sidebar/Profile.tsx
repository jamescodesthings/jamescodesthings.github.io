import { Prose } from '../../typography/Prose';
import { SidebarHeading } from '../../headings/SidebarHeading';
import Icon from '../../../assets/svg/jamicons/user-circle.svg';
import spacing from '../../../styles/spacing.module.pcss';
import { Profile as ProfileData } from '../../../data/Profile';

export const Profile = () => (
  <>
    <section className={`${spacing.mtDouble}`}>
      <SidebarHeading title={`Profile`} icon={<Icon />} className={`${spacing.mbHalf}`} />
      <Prose>
        {ProfileData.map((sentence, i) => (
          <p key={`profile-${i}`}>{sentence}</p>
        ))}
      </Prose>
    </section>
  </>
);
