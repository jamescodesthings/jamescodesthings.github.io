import styles from './ExperienceContent.module.pcss';
import { Experience, ExperienceEntry } from './data/Expereince';
import moment from 'moment';

type DatesProps = {
  from: moment.Moment;
  to?: moment.Moment;
};
const Dates = ({ from, to }: DatesProps) => {
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
        {entry.tech?.map(t => (
          <>
            <div className={`${styles.badgeWrapper}`}>{t}</div>
          </>
        ))}
      </div>
      <header className={`${styles.summary}`}>
        <p>{entry.summary}</p>
      </header>

      {entry.detail?.map((p, i) => (
        <p key={`${entry.employer}-detail-i`} className={`${styles.detail}`}>
          {p.map(s => (
            <>{s} </>
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
