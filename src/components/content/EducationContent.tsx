import styles from './ExperienceContent.module.pcss';
import spacing from '../../styles/spacing.module.pcss';
import { Education, EducationEntry } from './data/Education';
import { Dates } from './ExperienceContent';

type EntryProps = {
  entry: EducationEntry;
};
const Entry = ({ entry }: EntryProps) => (
  <article className={`${spacing.mb}`}>
    <div className={`${styles.row}`}>
      <h1 className={`${styles.employer}`}>{entry.institution}</h1>
      <Dates {...entry} />
    </div>
    {entry.qualifications.map((q, i) => (
      <div key={`q-${i}`} className={`${styles.row} !justify-start !items-baseline !mb-0`}>
        <h2 className={`${styles.summary} !font-bold !not-italic mr-2 !mb-0`}>{q.title}</h2>
        {q.aside && <h3 className={`${styles.summary} !text-base !mb-0`}>{q.aside}</h3>}
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
