import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { Badge } from '../components/ui/Badge';
import { DevIcon } from '../components/ui/DevIcon';

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
    summary: 'Overhauling, updating, and improving Mobile and Web apps.',
    detail: [
      [
        'I was tasked with overhauling the Engineius mobile app, while transitioning its development in house.',
        'I significantly improved the performance, UX/UI, stability and maintainability of the app.',
        "I also worked to significantly improve the architecture and performance of the company's main web app.",
      ],
      [
        'I delivered multiple business derived projects working closely with the end users involved.',
        "I also lead and mentored new employees on the mobile app's development.",
      ],
    ],
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
      <Badge key={'tech-ns'} icon={<img src="/assets/icons/nativescript-logo.png" alt={'nativescript eww'} />}>
        Nativescript
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
    summary: 'Shipping the mobile app for the Subscription platform and going Serverless.',
    detail: [
      [
        'I worked with Packt for 2 years on the Subscription platform.',
        'I was initially hired to expand the web application into a cross platform mobile app.',
        'I was also instrumental in migrating the API to use the Serverless framework on AWS.',
        'I worked with a team of developers with varying skill sets, helping to upskill and train new members of the team.',
      ],
      [
        'My development career became very focussed on Javascript stacks, writing brilliant code to solve complex solutions on a variety of platforms.',
        'During my time with Packt I endeavoured to improve code quality across the stack, helping develop and implement the code style used in house.',
      ],
    ],
    tech: [
      <Badge key={'tech-node'} icon={<DevIcon icon={`devicon-nodejs-plain`} />}>
        Node.js
      </Badge>,
      <Badge key={'tech-aws'} icon={<DevIcon icon={`devicon-amazonwebservices-plain`} />}>
        AWS
      </Badge>,
      <Badge key={'tech-serverless'} icon={<img src="/assets/icons/sls.svg" alt={'Serverless'} />}>
        Serverless
      </Badge>,
      <Badge key={'tech-ng'} icon={<DevIcon icon={`devicon-angularjs-plain`} />}>
        Angular
      </Badge>,
      <Badge key={'tech-cordova'} icon={<img src="/assets/icons/cordova_256.png" alt={'Cordova'} />}>
        Cordova
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
    summary: 'Delivering web and mobile apps to drive the business forward.',
    detail: [
      [
        'I worked with Severn Trent PLC for 5 years developing a multitude of software solutions deployed to a wide variety of platforms.',
      ],
      [
        'Later in the role my forté was developing brilliant PWAs and Hybrid Mobile apps for use throughout the company.',
        'During my time with Severn Trent I developed solid, maintainable applications in the correct technology for the solution.',
      ],
      [
        'I worked with an ever changing tech stack to improve speed of delivery, starting with a Java & Spring backend, moving through .Net and landing on Node.js',
        'All the time improving my core skills in Design, Prototyping, Testing, Computer Law, Security, and implementing best practice.',
        'I jumped at the opportunity to lead my team, train our new starters, and suggest the ideal solution to complex software problems.',
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
