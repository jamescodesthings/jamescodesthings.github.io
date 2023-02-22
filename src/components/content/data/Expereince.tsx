import moment from 'moment';
import { ReactNode } from 'react';
import { Badge } from '../../ui/Badge';
import { DevIcon } from '../../ui/DevIcon';

export type ExperienceEntry = {
  /**
   * The employer's name
   */
  employer: string;

  /**
   * The from date
   */
  from: moment.Moment;

  /**
   * The to date
   */
  to?: moment.Moment;

  /**
   * Each paragraph of summary
   */
  summary: string[];

  /**
   * Detailed description of the role
   */
  detail?: string[];
  /**
   * Tech/Badges relating to the role
   */
  tech?: ReactNode[];
};

export const Experience: ExperienceEntry[] = [
  {
    employer: 'Engineius',
    from: moment('2020-07-01'),
    to: moment('2023-02-01'),
    summary: ['Working with Engineius to maintain, improve, and update their Mobile and Web apps.'],
    detail: ['I started working for Engineius in 2020, with an initial remit to stabilize their hybrid app.'],
    tech: [
      <Badge key={'tech-ns'} icon={<img src="/assets/icons/nativescript-logo.png" alt={'nativescript eww'} />}>
        Nativescript
      </Badge>,
      <Badge key={'tech-ng'} icon={<DevIcon icon={`devicon-angularjs-plain`} />}>
        Angular
      </Badge>,
    ],
  },
];
