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
   * A summary/tagline.
   */
  summary: string;

  /**
   * The detail, each outer array is the paragraph, each item of the inner array is the sentence
   */
  detail?: string[][];
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
    summary: 'Working with Engineius to maintain, improve, and update their Mobile and Web apps.',
    detail: [
      [
        'I started working for Engineius in 2020.',
        'To begin with my job was to stabilize their hybrid app, which had originally been delivered with major faults and no styling.',
        'I then moved on to the architecture of their .net core web app, and angular front end.',
        "Since, I've continued to maintain, update, and bring new features to both apps.",
      ],
    ],
    tech: [
      <Badge key={'tech-ns'} icon={<img src="/assets/icons/nativescript-logo.png" alt={'nativescript eww'} />}>
        Nativescript
      </Badge>,
      <Badge key={'tech-ng'} icon={<DevIcon icon={`devicon-angularjs-plain`} />}>
        Angular
      </Badge>,
      <Badge key={'tech-net-core'} icon={<DevIcon icon={`devicon-dotnetcore-plain`} />}>
        .net core
      </Badge>,
      <Badge key={'tech-net-core'} icon={<DevIcon icon={`devicon-typescript-plain`} />}>
        Typescript
      </Badge>,
      <Badge key={'tech-net-core'} icon={<DevIcon icon={`devicon-mysql-plain`} />}>
        MySQL
      </Badge>,
    ],
  },
  {
    employer: 'Packt',
    from: moment('2017-11-01'),
    to: moment('2020-01-01'),
    summary: 'Working with Packt on their Subscription platform, on the Web and Mobile',
    detail: [
      [
        'I worked with Packt for 2 years on their Subscription platform.',
        "It's still in use and runs as a Web app and Hybrid Mobile app.",
        'I was instrumental in delivering their mobile app.',
        'I also worked rigorously in updating the Web Front End to modern javascript standards.',
      ],
    ],
    tech: [
      <Badge key={'tech-cordova'} icon={<img src="/assets/icons/cordova_256.png" alt={'Cordova'} />}>
        Cordova
      </Badge>,
      <Badge key={'tech-ng'} icon={<DevIcon icon={`devicon-angularjs-plain`} />}>
        Angular
      </Badge>,
      <Badge key={'tech-node'} icon={<DevIcon icon={`devicon-nodejs-plain`} />}>
        Node.js
      </Badge>,
      <Badge key={'tech-aws'} icon={<DevIcon icon={`devicon-amazonwebservices-plain`} />}>
        AWS
      </Badge>,
      <Badge key={'tech-serverless'} icon={<img src="/assets/icons/sls.svg" alt={'Serverless'} />}>
        Serverless
      </Badge>,
      <Badge key={'tech-postgres'} icon={<DevIcon icon={`devicon-postgresql-plain`} />}>
        Postgres
      </Badge>,
    ],
  },
  {
    employer: 'Severn Trent',
    from: moment('2012-09-01'),
    to: moment('2017-10-01'),
    summary: 'Working with a cross functional team of Web and Mobile developers to deliver in-house apps.',
    detail: [
      [
        'I started my career at Severn Trent.',
        'To begin with I worked third line tech support on various B2C and B2B apps.',
        'Over my career I moved into Web development to deliver internal apps.',
        'Then, when the company moved mobile I adapted and started to deliver Hybrid Mobile apps.',
      ],
      [
        'I worked with lots of Programming Languages, Platforms and Frameworks with Severn Trent.',
        'Starting on a Java and Spring base to deliver Bootstrap & JQuery apps.',
        'Moving to .Net APIs and delivering Hybrid Mobile and Web SPAs.',
      ],
      [
        'I was also crucial in multiple design implementation projects.',
        'On multiple occasions I implemented the initial phases of site redesigns for the Customer Web App, and other internal apps.',
      ],
    ],
    tech: [
      <Badge key={'tech-dot-net'} icon={<DevIcon icon={`devicon-dot-net-plain`} />}>
        .Net
      </Badge>,
      <Badge key={'tech-sql'} icon={<DevIcon icon={`devicon-microsoftsqlserver-plain`} />}>
        SQL Server
      </Badge>,
      <Badge key={'tech-cordova'} icon={<img src="/assets/icons/cordova_256.png" alt={'Cordova'} />}>
        Cordova
      </Badge>,
      <Badge key={'tech-ng'} icon={<DevIcon icon={`devicon-angularjs-plain`} />}>
        Angular
      </Badge>,
      <Badge key={'tech-aws'} icon={<DevIcon icon={`devicon-amazonwebservices-plain`} />}>
        AWS
      </Badge>,
      <Badge key={'tech-java'} icon={<DevIcon icon={`devicon-java-plain`} />}>
        Java
      </Badge>,
      <Badge key={'tech-bootstrap'} icon={<DevIcon icon={`devicon-bootstrap-plain`} />}>
        Bootstrap
      </Badge>,
    ],
  },
];
