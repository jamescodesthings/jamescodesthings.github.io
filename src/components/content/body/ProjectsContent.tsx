import React from 'react';
import dayjs from 'dayjs';
import styles from './ProjectsContent.module.pcss';
import { CenteredLabel } from '../../utils/Label';

type Project = {
  id: number;
  employer: string;
  name: string;
  from: dayjs.Dayjs;
  summary: string[];
};

const projects = [
  { id: 0, employer: 'Engineius', name: 'Portal Architecture', from: dayjs('2021-01-01'), summary: [''] },
  { id: 1, employer: 'Engineius', name: 'Mobile App', from: dayjs('2020-01-01'), summary: [''] },
  { id: 2, employer: 'Packt', name: 'Subscription App', from: dayjs('2018-01-01'), summary: [''] },
  { id: 3, employer: 'Severn Trent', name: 'STUCA', from: dayjs('2016-01-01'), summary: [''] },
  { id: 4, employer: 'Severn Trent', name: 'DWSP', from: dayjs('2014-01-01'), summary: [''] },
  { id: 5, employer: 'Severn Trent', name: 'Portal Rebrand', from: dayjs('2012-01-01'), summary: [''] },
];

type EntryProps = {
  project: Project;
};
const Entry = ({ project }: EntryProps) => (
  <>
    <div className={`${styles.entry}`}>
      <div className={`${styles.left}`}>
        <div className={`${styles.year}`}>{project.from.format('YYYY')}</div>
        {/*<div className={`${styles.name}`}>{project.name}</div>
        <div className={`${styles.employer}`}>{project.employer}</div>*/}
        <div className={`${styles.timeline}`}></div>
      </div>
      <div className={`${styles.right}`}></div>
    </div>
  </>
);

export const ProjectsContent = () => {
  return (
    <>
      <div className={`${styles.projectsWrapper}`}>
        {projects.map(project => (
          <Entry key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};
