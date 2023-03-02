import styles from './ExperienceContent.module.pcss';
import typography from '../../../styles/typography.module.pcss';
import spacing from '../../../styles/spacing.module.pcss';
import { Education, EducationEntry } from '../../../data/Education';
import { Dates } from './ExperienceContent';

type EntryProps = {
  entry: EducationEntry;
};
const Entry = ({ entry }: EntryProps) => (
  <article className={`${spacing.mb}`}>
    <div className={`${styles.rowCollapse} ${spacing.mbHalf}`}>
      <h2 className={`${typography.h2}`}>{entry.institution}</h2>
      <Dates {...entry} />
    </div>
    {entry.qualifications.map((q, i) => (
      <div key={`q-${i}`} className={`${styles.rowCollapse} ${spacing.mbHalf} !justify-start !items-baseline !mb-0`}>
        <h3 className={`${typography.h3} ${spacing.mbHalf} !font-bold !not-italic mr-2 !mb-0`}>{q.title}</h3>
        {q.aside && <h3 className={`${spacing.mbHalf} ${typography.leader} !text-base !mb-0`}>{q.aside}</h3>}
      </div>
    ))}
  </article>
);

export const EducationContent = () => (
  <>
    {Education.map(e => (
      <Entry key={`education-${e.institution}`} entry={e} />
    ))}
  </>
);
