import React from 'react';
import dayjs from 'dayjs';
import { PropsWithClassName } from '../../../types/PropsWithClassName';
import styles from './ProjectsContent.module.pcss';
import typography from '../../../styles/typography.module.pcss';

type Project = {
  id: number;
  employer: string;
  name: string;
  from: dayjs.Dayjs;
  summary: string[];
};

const loremSummary = [
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  'Aliquam, assumenda, quos.',
  'Accusantium asperiores assumenda blanditiis culpa delectus deleniti in quis repellat reprehenderit.',
  'Doloremque facere, voluptatibus?',
  'Explicabo perferendis quaerat repudiandae veniam!',
];

const projects = [
  {
    id: 0,
    employer: 'Engineius',
    name: 'Portal Architecture',
    from: dayjs('2021-01-01'),
    summary: loremSummary,
  },
  { id: 1, employer: 'Engineius', name: 'Mobile App', from: dayjs('2020-01-01'), summary: loremSummary },
  { id: 2, employer: 'Packt', name: 'Subscription App', from: dayjs('2018-01-01'), summary: loremSummary },
  { id: 3, employer: 'Severn Trent', name: 'STUCA', from: dayjs('2016-01-01'), summary: loremSummary },
  { id: 4, employer: 'Severn Trent', name: 'DWSP', from: dayjs('2014-01-01'), summary: loremSummary },
  { id: 5, employer: 'Severn Trent', name: 'Portal Rebrand', from: dayjs('2012-01-01'), summary: loremSummary },
];

type EntryProps = {
  project: Project;
};
const Entry = ({ project, className }: PropsWithClassName<EntryProps>) => (
  <section className={`${styles.entry} ${className}`}>
    <aside className={`${styles.left}`}>
      <div className={`${styles.year}`}>{project.from.format('YYYY')}</div>
      <div className={`${styles.timelineCircle}`}></div>
      <div className={`${styles.timeline}`}></div>
      <div className={`${styles.timelineCircle}`}></div>
    </aside>
    <article className={`${styles.right}`}>
      <h2 className={`${typography.h2}`}>{project.name}</h2>
      <h3 className={`${typography.h3}`}>{project.employer}</h3>
      {project?.summary?.map((p, i) => (
        <p key={`${project.name}-${i}`}>{p}</p>
      ))}
    </article>
  </section>
);

export const ProjectsContent = () => {
  return (
    <>
      <div className={`${styles.projectsWrapper}`}>
        {projects.map((project, i) => (
          <Entry key={project.id} project={project} className={`${i === projects.length - 1 ? styles.last : ''}`} />
        ))}
      </div>
    </>
  );
};
