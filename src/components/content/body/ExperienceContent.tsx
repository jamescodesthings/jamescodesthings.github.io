import { Experience, ExperienceEntry } from '../../../data/Expereince';
import dayjs from 'dayjs';
import typography from '../../../styles/typography.module.pcss';
import spacing from '../../../styles/spacing.module.pcss';
import styles from './ExperienceContent.module.pcss';

type DatesProps = {
  from: dayjs.Dayjs;
  to?: dayjs.Dayjs;
};
export const Dates = ({ from, to }: DatesProps) => {
  const dateFormat = "MMM 'YY";
  return (
    <>
      <h3 className={`${typography.h3}`}>
        <span>
          {from.format(dateFormat)} - {to ? to.format(dateFormat) : 'Present'}
        </span>
      </h3>
    </>
  );
};

type EntryProps = {
  entry: ExperienceEntry;
};
const Entry = ({ entry }: EntryProps) => (
  <>
    <article className={`${styles.entry} ${spacing.mb}`}>
      <div className={`${styles.row} ${spacing.mbHalf}`}>
        <h2 className={`${typography.h2}`}>{entry.employer}</h2>
        <Dates {...entry} />
      </div>
      <div className={`${styles.techWrapper} ${spacing.mbHalf}`}>
        {entry.tech?.map((t, i) => (
          <div key={`${entry.employer}-tech-${i}`} className={`${styles.badgeWrapper}`}>
            {t}
          </div>
        ))}
      </div>
      <header className={`${spacing.mbHalf} ${typography.leader} `}>
        <p>{entry.summary}</p>
      </header>

      {entry.detail?.map((p, i) => (
        <p key={`${entry.employer}-detail-${i}`} className={`${spacing.mbHalf} ${typography.body}`}>
          {p.map((s, j) => (
            <span key={`${entry.employer}-detail-${i}-${j}`}>{s} </span>
          ))}
        </p>
      ))}
    </article>
  </>
);

export const ExperienceContent = () => (
  <>
    {Experience.map(entry => (
      <Entry key={`entry-${entry.employer}`} entry={entry} />
    ))}
  </>
);
