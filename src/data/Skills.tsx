import { ReactNode } from 'react';

export enum SkillLayer {
  FullStack = 'full-stack',
  FrontEnd = 'front-end',
  ServerSide = 'server-side',
  Mobile = 'mobile',
  Database = 'database',
  Devops = 'dev-ops',
}

export enum SkillType {
  Language = 'language',
  Framework = 'framework',
  Platform = 'platform',
  Library = 'library',
  Tool = 'tool',
}

export type Sortable = {
  order?: number;
};

export type Skill = Sortable & {
  slug: string;
  name: string;
  icon: ReactNode;
  type: SkillType;
  layer: SkillLayer;
};

export const rawSkills: Skill[] = [
  {
    slug: 'typescript',
    name: 'Typescript',
    icon: 'devicon-typescript-plain',
    type: SkillType.Language,
    layer: SkillLayer.FullStack,
  },
  {
    slug: 'html',
    name: 'HTML 5',
    icon: 'devicon-html5-plain',
    type: SkillType.Language,
    layer: SkillLayer.FrontEnd,
  },
  {
    slug: 'css',
    name: 'CSS 3',
    icon: 'devicon-css3-plain',
    type: SkillType.Language,
    layer: SkillLayer.FrontEnd,
  },
  {
    slug: 'javascript',
    name: 'Javascript',
    icon: 'devicon-javascript-plain',
    type: SkillType.Language,
    layer: SkillLayer.FullStack,
  },
  {
    slug: 'angular',
    name: 'Angular',
    type: SkillType.Framework,
    layer: SkillLayer.FrontEnd,
    icon: 'devicon-angularjs-plain',
  },
  {
    slug: 'react-js',
    name: 'React',
    type: SkillType.Framework,
    layer: SkillLayer.FrontEnd,
    icon: 'devicon-react-original',
  },
  {
    slug: 'redux-js',
    name: 'Redux',
    type: SkillType.Framework,
    layer: SkillLayer.FrontEnd,
    icon: 'devicon-redux-original',
  },
  {
    slug: 'tailwind',
    name: 'Tailwind',
    type: SkillType.Framework,
    layer: SkillLayer.FrontEnd,
    icon: 'devicon-tailwindcss-plain',
  },
  {
    slug: 'node-js',
    name: 'NodeJS',
    icon: 'devicon-nodejs-plain',
    type: SkillType.Platform,
    layer: SkillLayer.ServerSide,
  },
  {
    slug: 'dotnet-core',
    name: '.net core',
    type: SkillType.Platform,
    layer: SkillLayer.ServerSide,
    icon: 'devicon-dotnetcore-plain',
  },
  {
    slug: 'c-sharp',
    name: 'C#',
    type: SkillType.Language,
    layer: SkillLayer.ServerSide,
    icon: 'devicon-csharp-plain',
  },
  {
    slug: 'serverless-framework',
    name: 'Serverless',
    icon: <img src="/assets/icons/sls.svg" alt={'serverless'} />,
    type: SkillType.Framework,
    layer: SkillLayer.ServerSide,
  },
  {
    slug: 'aws-lambda',
    name: 'AWS Lambda',
    type: SkillType.Platform,
    layer: SkillLayer.ServerSide,
    icon: <img src="/assets/icons/aws-lambda.svg" alt={'labmda'} />,
  },
  {
    slug: 'stencil-js',
    name: 'Stencil JS',
    type: SkillType.Framework,
    layer: SkillLayer.FrontEnd,
    icon: <img src="/assets/icons/stencil-logo.png" alt={'stencil'} />,
  },
  {
    slug: 'sass',
    name: 'SASS',
    type: SkillType.Language,
    layer: SkillLayer.FrontEnd,
    icon: 'devicon-sass-plain',
  },
  {
    slug: 'capacitor',
    name: 'Capacitor',
    icon: <img src="/assets/icons/capacitor-logo.png" alt={'capacitor'} />,
    type: SkillType.Platform,
    layer: SkillLayer.Mobile,
  },
  {
    slug: 'cordova',
    name: 'Cordova',
    icon: <img src="/assets/icons/cordova_256.png" alt={'cordova'} />,
    type: SkillType.Platform,
    layer: SkillLayer.Mobile,
  },
  {
    slug: 'ionic',
    name: 'Ionic',
    icon: 'devicon-ionic-original',
    type: SkillType.Framework,
    layer: SkillLayer.FrontEnd,
  },
  {
    slug: 'ios',
    name: 'iOS',
    icon: 'devicon-apple-plain',
    type: SkillType.Platform,
    layer: SkillLayer.Mobile,
  },
  {
    slug: 'android',
    name: 'Android',
    icon: 'devicon-android-plain',
    type: SkillType.Platform,
    layer: SkillLayer.Mobile,
  },
  {
    slug: 'circle-ci',
    name: 'CircleCI',
    icon: 'devicon-circleci-plain',
    type: SkillType.Platform,
    layer: SkillLayer.Devops,
  },
  {
    slug: 'aws',
    name: 'AWS',
    icon: 'devicon-amazonwebservices-plain',
    type: SkillType.Platform,
    layer: SkillLayer.ServerSide,
  },
  {
    slug: 'webpack',
    name: 'Webpack',
    icon: 'devicon-webpack-plain',
    type: SkillType.Library,
    layer: SkillLayer.FullStack,
  },
  {
    slug: 'sqlite',
    name: 'SQLite',
    icon: 'devicon-sqlite-plain',
    type: SkillType.Platform,
    layer: SkillLayer.Database,
  },
  {
    slug: 'mssql',
    name: 'SQL Server',
    icon: 'devicon-microsoftsqlserver-plain',
    type: SkillType.Platform,
    layer: SkillLayer.Database,
  },
  {
    slug: 'mysql',
    name: 'MySQL',
    icon: 'devicon-mysql-plain',
    layer: SkillLayer.Database,
    type: SkillType.Platform,
  },
  {
    slug: 'aws-dynamodb',
    name: 'AWS DynamoDB',
    type: SkillType.Platform,
    layer: SkillLayer.Database,
    icon: <img src="/assets/icons/aws-dynamo.svg" alt={'dynamo'} />,
  },
  {
    slug: 'firebase',
    name: 'Firebase',
    type: SkillType.Platform,
    layer: SkillLayer.Database,
    icon: 'devicon-firebase-plain',
  },
  {
    slug: 'jest',
    name: 'Jest',
    icon: 'devicon-jest-plain',
    type: SkillType.Library,
    layer: SkillLayer.Devops,
  },
  {
    slug: 'jasmine',
    name: 'Jasmine',
    icon: 'devicon-jasmine-plain',
    type: SkillType.Library,
    layer: SkillLayer.Devops,
  },
  {
    slug: 'adobe-illustrator',
    name: 'Illustrator',
    icon: 'devicon-illustrator-plain',
    type: SkillType.Library,
    layer: SkillLayer.FrontEnd,
  },
  {
    slug: 'adobe-photoshop',
    name: 'Photoshop',
    icon: 'devicon-photoshop-plain',
    type: SkillType.Tool,
    layer: SkillLayer.FrontEnd,
  },
  {
    slug: 'sketch',
    name: 'Sketch',
    icon: 'devicon-sketch-line',
    type: SkillType.Tool,
    layer: SkillLayer.FrontEnd,
  },
  {
    slug: 'git',
    name: 'git',
    icon: 'devicon-git-plain',
    type: SkillType.Library,
    layer: SkillLayer.Devops,
  },
  {
    slug: 'nativescript',
    name: 'Nativescript',
    type: SkillType.Framework,
    layer: SkillLayer.Mobile,
    icon: <img src="/assets/icons/nativescript-logo.png" alt={'nativescript eww'} />,
  },
];

export const skills = rawSkills.map((skill, i) => ({ ...skill, order: i }));
