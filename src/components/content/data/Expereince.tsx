import dayjs from 'dayjs';
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
  from: dayjs.Dayjs;

  /**
   * The to date
   */
  to?: dayjs.Dayjs;

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
    from: dayjs('2020-07-01'),
    to: dayjs('2023-02-01'),
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
    from: dayjs('2017-11-01'),
    to: dayjs('2020-01-01'),
    summary: 'Working with Packt on their Subscription platform, on the Web and Mobile.',
    detail: [
      [
        'I worked with Packt for 2 years on their Subscription platform.',
        'I was initially hired to wrap their application for use as a hybrid mobile app, which I then maintained and improved.',
        'I was also instrumental in upgrading their stack to use the Serverless framework and AWS Lambdas in NodeJS.',
        'I worked with a team of developers with varying skill sets, helping to upskill and train new members of the team.',
      ],
      [
        'My development career became very focussed on Javascript stacks, writing brilliant code to solve complex solutions on a variety of platforms.',
        'During my time with Packt I endeavoured to improve code quality with automated tools and manual refactoring.',
        'I was successful in upgrading their ES5 front end to ES6 with the use of first class build tools such as Babel and Webpack.',
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
    from: dayjs('2012-09-01'),
    to: dayjs('2017-10-01'),
    summary: 'Working with a cross functional team of Web and Mobile developers to deliver web and mobile apps.',
    detail: [
      [
        'I worked with Severn Trent PLC for 5 years developing a multitude of software solutions for varying platforms with an eclectic use of the ever expanding technologies available.',
      ],
      [
        'Later in the role my forté became been to develop brilliant Progressive Web apps and Hybrid Mobile apps in Ionic and the most suitable supporting technologies for each project.',
        'Throughout my time with Severn Trent I developed solid, maintainable applications in the correct technology for the solution.',
        'Starting with the Java Play Framework, moving to ASP.Net MVC and finally focusing on MEAN and variant ES6 stacks.',
      ],
      [
        'All the time improving my core skills in Design, Prototyping, Testing, Computer Law, Security, and programming best practice.',
        'I jumped at the opportunity to lead my team, train our new starters, and suggest the ideal solution to complex software problems.',
      ],
      [
        'I worked with the senior management teams, presenting to potential investors and producing applications allowing the business to expand successfully into new countries.',
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
