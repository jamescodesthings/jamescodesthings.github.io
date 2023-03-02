import dayjs from 'dayjs';
import { Badge } from '../components/ui/Badge';
import { DevIcon } from '../components/ui/DevIcon';
import React, { ReactNode } from 'react';

export type Project = {
  id: number;
  employer: string;
  name: string;
  from: dayjs.Dayjs;
  leader?: string;
  summary: string[][];
  canHide?: boolean;
  tech?: ReactNode[];
};

const loremSummary = [
  [
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    'Aliquam, assumenda, quos.',
    'Accusantium asperiores assumenda blanditiis culpa delectus deleniti in quis repellat reprehenderit.',
  ],
  ['Doloremque facere, voluptatibus?', 'Explicabo perferendis quaerat repudiandae veniam!'],
];

export const projects = [
  {
    id: 0,
    employer: 'Engineius',
    name: 'Portal Architecture',
    from: dayjs('2021-01-01'),
    tech: [
      <Badge key={'tech-net-core'} icon={<DevIcon icon={`devicon-typescript-plain`} />}>
        Typescript
      </Badge>,
      <Badge key={'tech-net-core'} icon={<DevIcon icon={`devicon-dotnetcore-plain`} />}>
        .net core
      </Badge>,
      <Badge key={'tech-ng'} icon={<DevIcon icon={`devicon-angularjs-plain`} />}>
        Angular
      </Badge>,
    ],
    leader: "Updated the Web Portal's architecture to split front end and api.",
    summary: [
      [
        "The customer facing web portal was serving via. an old Angular .net core template's architecture. Each client route returned an angular app as a page.",
      ],
      [
        'In this project I extracted the front end Angular apps into their own project, bootstrapped webpack and switched all routing to the angular front end.',
        'This involved overhauling routing, the webpack build, and the angular project as a whole.',
      ],
      [
        'As a part of this project I also identified that the vendor bundle had been misconfigured, serving node_module dependencies twice.',
        'Fixing this, implementing Lazy Loaded routing and separating the front end server from the back-end server resulted in significant performance improvements.',
      ],
      [
        "This also had a significant impact on development turnover, prior to these changes the rebuild cycle was well over a minute on most developer's machines.",
      ],
    ],
  },
  {
    id: 1,
    employer: 'Engineius',
    name: 'Mobile App',
    from: dayjs('2020-01-01'),
    leader: 'Bringing a third party development in house',
    summary: [
      [
        'Engineius originally outsourced their app development as is common in early startup phase.',
        'This project involved bringing the functioning production app development in house and up to a long term maintainable standard.',
      ],
      [
        'My initial work here was to take stock, and roughly plan the necessary changes to ensure long term maintenance.',
        'There was also a looming deadline of an iOS upgrade deprecating the old Web View.',
      ],
      [
        'I started by implementing some node best practices; dependency pinning, auto formatting & linting with CI layer build checks.',
        'I then upgraded the underlying frameworks to their latest stable versions, this included bringing Nativecsript to v7+ and Angular to 12+.',
        'As these were significant major version releases there was lots of in depth analysis and retest work along with the development.',
      ],
      [
        'Once this work was complete and functioning I then focused on outstanding production app issues.',
        "In particular there were multiple memory leaks, performance drags and the app's styling had not been completed or branded.",
      ],
    ],
  },
  {
    id: 2,
    canHide: true,
    employer: 'Packt',
    name: 'Subscription App',
    from: dayjs('2018-01-01'),
    summary: loremSummary,
  },
  { id: 3, canHide: true, employer: 'Severn Trent', name: 'STUCA', from: dayjs('2016-01-01'), summary: loremSummary },
  { id: 4, canHide: true, employer: 'Severn Trent', name: 'DWSP', from: dayjs('2014-01-01'), summary: loremSummary },
  {
    id: 5,
    canHide: true,
    employer: 'Severn Trent',
    name: 'Portal Rebrand',
    from: dayjs('2012-01-01'),
    summary: loremSummary,
  },
];
