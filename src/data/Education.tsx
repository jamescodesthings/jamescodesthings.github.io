import dayjs from 'dayjs';

type Qualification = {
  title: string;
  aside?: string;
};

export type EducationEntry = {
  institution: string;

  /**
   * The from date
   */
  from: dayjs.Dayjs;

  /**
   * The to date
   */
  to?: dayjs.Dayjs;

  /**
   * Qualifications earned
   */
  qualifications: Qualification[];
};

export const Education: EducationEntry[] = [
  {
    institution: 'Coventry University',
    from: dayjs('01/09/2009'),
    to: dayjs('01/06/2012'),
    qualifications: [
      {
        title: 'BSc Computer Science',
        aside: 'G400, 2.1 with Honors',
      },
    ],
  },
  {
    institution: 'Caroline Chisholm School',
    from: dayjs('01/09/2002'),
    to: dayjs('01/06/2009'),
    qualifications: [
      {
        title: '3 A Levels',
        aside: 'Including Computing',
      },
      {
        title: '11 GCSEs',
      },
    ],
  },
];
