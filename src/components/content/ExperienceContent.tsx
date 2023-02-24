import styles from './ExperienceContent.module.pcss';
import { Experience, ExperienceEntry } from './data/Expereince';
import dayjs from 'dayjs';

type DatesProps = {
  from: dayjs.Dayjs;
  to?: dayjs.Dayjs;
};
export const Dates = ({ from, to }: DatesProps) => {
  const dateFormat = "MMM 'YY";
  return (
    <>
      <h2 className={`${styles.dates}`}>
        <span className={`${styles.from}`}>{from.format(dateFormat)}</span>{' '}
        <span className={`${styles.separator}`}>-</span>{' '}
        <span className={`${styles.to}`}>{to ? to.format(dateFormat) : 'Present'}</span>
      </h2>
    </>
  );
};

type EntryProps = {
  entry: ExperienceEntry;
};
const Entry = ({ entry }: EntryProps) => (
  <>
    <article className={`${styles.entry}`}>
      <div className={`${styles.row}`}>
        <h1 className={`${styles.employer}`}>{entry.employer}</h1>
        <Dates {...entry} />
      </div>
      <div className={`${styles.techWrapper}`}>
        {entry.tech?.map((t, i) => (
          <div key={`${entry.employer}-tech-${i}`} className={`${styles.badgeWrapper}`}>
            {t}
          </div>
        ))}
      </div>
      <header className={`${styles.summary}`}>
        <p>{entry.summary}</p>
      </header>

      {entry.detail?.map((p, i) => (
        <p key={`${entry.employer}-detail-${i}`} className={`${styles.detail}`}>
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
