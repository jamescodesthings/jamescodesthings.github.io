import { ReactNode } from 'react';

export interface Sortable {
  order?: number;
}

export interface Skill extends Sortable {
  slug: string;
  name: string;
  icon: ReactNode;
}

export interface SkillGroup extends Sortable {
  name: string;
  slug: string;
  icon: ReactNode;
  skills: Skill[];
}

const serverside: SkillGroup = {
  slug: 'server-side',
  name: 'Server Side',
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5.5 -2 24 24" width="24" fill="currentColor">
      <path d="M3 0h7a3 3 0 0 1 3 3v17H0V3a3 3 0 0 1 3-3zM2 18h9V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v15zM4 4h1a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm0 3h1a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zm0 3h1a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 3h1a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm4-9h1a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2zm0 3h1a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2zm0 3h1a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm0 3h1a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm-3 3h3a1 1 0 0 1 1 1v1H4v-1a1 1 0 0 1 1-1z"></path>
    </svg>
  ),
  order: 1,
  skills: [
    {
      slug: 'node-js',
      name: 'NodeJS',
      icon: 'devicon-nodejs-plain',
      order: 1,
    },
    {
      slug: 'serverless-framework',
      name: 'Serverless',
      icon: <img src="/assets/icons/sls.svg" alt={'serverless'} />,
      order: 1,
    },
    {
      slug: 'dotnet-core',
      name: '.net core',
      icon: 'devicon-dotnetcore-plain',
      order: 3,
    },
    {
      slug: 'c-sharp',
      name: 'C#',
      icon: 'devicon-csharp-plain',
      order: 3,
    },
    {
      slug: 'aws-lambda',
      name: 'AWS Lambda',
      icon: <img src="/assets/icons/aws-lambda.svg" alt={'labmda'} />,
      order: 1,
    },
  ],
};

const clientSide: SkillGroup = {
  slug: 'client-side',
  name: 'Client Side',
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -3 24 24" width="24" fill="currentColor">
      <path d="M3 2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3zm0-2h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm4 16h6a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z"></path>
    </svg>
  ),
  order: 2,
  skills: [
    // Core Languages at position 1-3

    {
      slug: 'typescript',
      name: 'Typescript',
      icon: 'devicon-typescript-plain',
      order: 1,
    },
    {
      slug: 'html',
      name: 'HTML 5',
      icon: 'devicon-html5-plain',
      order: 2,
    },
    {
      slug: 'css',
      name: 'CSS 3',
      icon: 'devicon-css3-plain',
      order: 2,
    },
    {
      slug: 'javascript',
      name: 'Javascript',
      icon: 'devicon-javascript-plain',
      order: 3,
    },
    // Frameworks 4-6
    {
      slug: 'stencil-js',
      name: 'Stencil JS',
      icon: <img src="/assets/icons/stencil-logo.png" alt={'stencil'} />,
      order: 5,
    },
    {
      slug: 'angular',
      name: 'Angular',
      icon: 'devicon-angularjs-plain',
      order: 6,
    },
    {
      slug: 'react-js',
      name: 'React',
      icon: 'devicon-react-original',
      order: 7,
    },
    {
      slug: 'redux-js',
      name: 'Redux',
      icon: 'devicon-redux-original',
      order: 7,
    },
    {
      slug: 'tailwind',
      name: 'Tailwind',
      icon: 'devicon-tailwindcss-plain',
      order: 5,
    },
    {
      slug: 'sass',
      name: 'SASS',
      icon: 'devicon-sass-plain',
      order: 4,
    },
  ],
};

const mobile: SkillGroup = {
  slug: 'mobile',
  name: 'Mobile',
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -2 24 24" width="24" fill="currentColor">
      <path d="M3 0h6a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3zm3 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
    </svg>
  ),
  order: 3,
  skills: [
    {
      slug: 'capacitor',
      name: 'Capacitor',
      icon: <img src="/assets/icons/capacitor-logo.png" alt={'capacitor'} />,
      order: 2,
    },
    {
      slug: 'cordova',
      name: 'Cordova',
      icon: <img src="/assets/icons/cordova_256.png" alt={'cordova'} />,
      order: 3,
    },
    {
      slug: 'ionic',
      name: 'Ionic',
      icon: 'devicon-ionic-original',
      order: 1,
    },
    {
      slug: 'ios',
      name: 'iOS',
      icon: 'devicon-apple-plain',
      order: 4,
    },
    {
      slug: 'android',
      name: 'Android',
      icon: 'devicon-android-plain',
      order: 4,
    },
    {
      slug: 'nativescript',
      name: 'Nativescript',
      icon: <img src="/assets/icons/nativescript-logo.png" alt={'nativescript eww'} />,
      order: 666,
    },
  ],
};

const database: SkillGroup = {
  slug: 'database',
  name: 'Database',
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" fill="currentColor">
      <path d="M3 12a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H3zm0-2a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3 3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-4a3 3 0 0 1 3-3zm0-8a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3zm2 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 10a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-3 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
    </svg>
  ),
  order: 4,
  skills: [
    {
      slug: 'sqlite',
      name: 'SQLite',
      icon: 'devicon-sqlite-plain',
      order: 2,
    },
    {
      slug: 'mssql',
      name: 'SQL Server',
      icon: 'devicon-microsoftsqlserver-plain',
      order: 2,
    },
    {
      slug: 'mysql',
      name: 'MySQL',
      icon: 'devicon-mysql-plain',
    },
    {
      slug: 'aws-dynamodb',
      name: 'AWS DynamoDB',
      icon: <img src="/assets/icons/aws-dynamo.svg" alt={'dynamo'} />,
    },
    {
      slug: 'firebase',
      name: 'Firebase',
      icon: 'devicon-firebase-plain',
    },
  ],
};

const tooling: SkillGroup = {
  slug: 'tooling',
  name: 'Tooling',
  order: 5,
  icon: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 24 24" width="24" fill="currentColor">
      <path d="M2.464 6.748c.06.942.45 1.865 1.164 2.578a3.997 3.997 0 0 0 3.866 1.036l1.114-.298 9.162 9.161a1 1 0 0 0 1.414-1.414L10.022 8.65l.298-1.115A3.997 3.997 0 0 0 9.284 3.67a3.995 3.995 0 0 0-2.578-1.164L7.93 3.728A3 3 0 1 1 3.686 7.97L2.464 6.748zm-.9-3.727L5.1 6.556a1 1 0 0 0 1.415-1.414L2.979 1.606a6.002 6.002 0 0 1 9.273 6.445l8.346 8.346a3 3 0 0 1-4.243 4.243L8.01 12.294A6.002 6.002 0 0 1 1.565 3.02zm15.5 15.496l1.42-1.41-1.42-1.414-1.419 1.414 1.418 1.41z"></path>
    </svg>
  ),
  skills: [
    {
      slug: 'circle-ci',
      name: 'CircleCI',
      icon: 'devicon-circleci-plain',
      order: 3,
    },
    {
      slug: 'aws',
      name: 'AWS',
      icon: 'devicon-amazonwebservices-plain',
      order: 1,
    },
    {
      slug: 'webpack',
      name: 'Webpack',
      icon: 'devicon-webpack-plain',
      order: 2,
    },
    {
      slug: 'jest',
      name: 'Jest',
      icon: 'devicon-jest-plain',
      order: 4,
    },
    {
      slug: 'jasmine',
      name: 'Jasmine',
      icon: 'devicon-jasmine-plain',
      order: 4,
    },
    {
      slug: 'git',
      name: 'git',
      icon: 'devicon-git-plain',
      order: 4,
    },
    {
      slug: 'adobe-illustrator',
      name: 'Illustrator',
      icon: 'devicon-illustrator-plain',
      order: 10,
    },
    {
      slug: 'adobe-photoshop',
      name: 'Photoshop',
      icon: 'devicon-photoshop-plain',
      order: 10,
    },
    {
      slug: 'sketch',
      name: 'Sketch',
      icon: 'devicon-sketch-line',
      order: 10,
    },
  ],
};

export const skills: SkillGroup[] = [serverside, clientSide, mobile, database, tooling];
