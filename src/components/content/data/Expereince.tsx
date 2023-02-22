import moment from 'moment';
import { ReactNode } from 'react';
import { Badge } from '../../ui/Badge';

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
    summary: [
      'I have worked with Engineius for the last two years maintaining and updating their mobile app, among other things.',
    ],
    tech: [
      <>
        <Badge icon={<img src="/src/assets/icons/nativescript-logo.png" alt={'nativescript eww'} />}>
          Nativescript
        </Badge>
      </>,
    ],
  },
];
