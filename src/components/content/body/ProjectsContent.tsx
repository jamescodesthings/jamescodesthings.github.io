import React, { ReactNode } from 'react';
import dayjs from 'dayjs';
import { PropsWithClassName } from '../../../types/PropsWithClassName';
import { getClassFromStyles } from '../../../utils/get-class-from-styles';
import styles from './ProjectsContent.module.pcss';
import typography from '../../../styles/typography.module.pcss';
import spacing from '../../../styles/spacing.module.pcss';
import { Project, projects } from '../../../data/Projects';

type EntryProps = {
  project: Project;
};
const Entry = ({ project, className }: PropsWithClassName<EntryProps>) => (
  <section className={`${styles.entry} ${getClassFromStyles(styles, className)}`}>
    <aside className={`${styles.left}`}>
      <div className={`${typography.h2} !font-light`}>{project.from.format('YYYY')}</div>
      <div className={`${styles.timelineCircle} ${styles.first}`}></div>
      <div className={`${styles.timeline}`}></div>
      <div className={`${styles.timelineCircle} ${styles.last}`}></div>
    </aside>
    <article className={`${styles.right} ${spacing.pb}`}>
      <div className={`${styles.row} ${spacing.mbHalf}`}>
        <h2 className={`${typography.h2}`}>{project.name}</h2>
        <h3 className={`${typography.h3}`}>{project.employer}</h3>
      </div>
      {project?.tech?.length && (
        <div className={`${styles.techWrapper} ${spacing.mbHalf}`}>
          {project?.tech?.map((t, j) => (
            <div key={`${project.name}-tech-${j}`} className={`${styles.badgeWrapper}`}>
              {t}
            </div>
          ))}
        </div>
      )}
      {project.leader && <p className={`${typography.leader} ${spacing.mbHalf}`}>{project.leader}</p>}
      {project?.summary?.map((p, i) => (
        <p key={`${project.name}-${i}`} className={`${spacing.mbHalf} ${typography.body}`}>
          {p.join(' ')}
        </p>
      ))}
    </article>
  </section>
);

export const ProjectsContent = () => {
  const filtered = projects.filter(p => !p.canHide);
  return (
    <>
      <div className={`${styles.projectsWrapper}`}>
        {filtered.map((project, i) => (
          <Entry
            key={project.id}
            project={project}
            className={`${i === filtered.length - 1 ? styles.last : ''} ${project.canHide ? styles.canHide : ''}`}
          />
        ))}
      </div>
    </>
  );
};
