import { SidebarHeading } from '../../headings/SidebarHeading';
import spacing from '../../../styles/spacing.module.pcss';
import { Profile as ProfileData } from '../../../data/Profile';
import { Prose } from '../../typography/Prose';

export const Profile = () => (
  <>
    <section className={`${spacing.mtSidebarFirst}`}>
      <SidebarHeading title={`Profile`} className={`!mb-px`} />
      <Prose>
        {ProfileData.map((sentence, i) => (
          <p key={`profile-${i}`} className={`${spacing.mbHalf}`}>
            {sentence}
          </p>
        ))}
      </Prose>
    </section>
  </>
);
