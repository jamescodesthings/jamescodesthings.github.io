import React from 'react';
import dayjs from 'dayjs';
import { Prose } from '../../typography/Prose';

const projects = [
  { employer: 'Engineius', name: 'Portal Architecture', from: dayjs('2021-01-01'), summary: [''] },
  { employer: 'Engineius', name: 'Mobile App', from: dayjs('2020-01-01'), summary: [''] },
  { employer: 'Packt', name: 'Subscription App', from: dayjs('2018-01-01'), summary: [''] },
  { employer: 'Severn Trent', name: 'STUCA', from: dayjs('2016-01-01'), summary: [''] },
  { employer: 'Severn Trent', name: 'DWSP', from: dayjs('2014-01-01'), summary: [''] },
  { employer: 'Severn Trent', name: 'Portal Rebrand', from: dayjs('2012-01-01'), summary: [''] },
];

export const ProjectsContent = () => {
  return (
    <Prose>
      <p>A breakdown of recent and past projects</p>
    </Prose>
  );
};
