import React from 'react';
import { Prose } from '../typography/Prose';
import { Badge } from '../ui/Badge';
import ViteIcon from '../../assets/svg/dev/vite.svg';
import utils from '../../styles/utils.module.pcss';
import { Highlight } from '../typography/Highlight';
import { DevIcon } from '../ui/DevIcon';

export const CoverLetterContent = () => {
  return (
    <Prose>
      <p>
        Hi, thanks for taking the time to check out my CV. I&apos;m <Highlight>James</Highlight>, a Senior Software
        Engineer based in The Midlands, UK. I&apos;ve worked on a variety of <Highlight>Full Stack</Highlight> Web
        Development and Cross Platform <Highlight>Mobile</Highlight> Development projects.
      </p>
      <p>
        I have <Highlight>over 10 years</Highlight> commercial web development experience, and{' '}
        <Highlight>over 5 years</Highlight> commercial cross platform mobile development experience.
      </p>
      <p>I am currently looking for full-time, remote roles as a Senior Developer.</p>
      <p>
        My ideal stack is <Highlight>Node.js</Highlight> or <Highlight>.net core</Highlight> on the back end, with{' '}
        <Highlight>React</Highlight> & <Highlight>Tailwind</Highlight> on the front. But, I have significant experience
        in a variety of Front End and Server Side technologies.
        {/*todo: add anchor link*/}
      </p>
      <p>
        I started web development at 12 years old, and have worked in the industry for my whole adult life. My core web
        skills developed alongside the growth of the web as a platform. As the web moved mobile I picked up solid
        responsive design skills, and the ability to develop commercial cross platform mobile apps.
      </p>
      <p>
        {/*todo: don't like the fragments here*/}I have a passion for development, writing clean and maintainable code
        to deliver great products to my end users. I&apos;ve always had a love for web and mobile design. I keep myself
        up to speed with the latest in technology trends, and strive to continually learn new things.
      </p>
      <span>
        This website was written with ❤️ in the Midlands. It&apos;s built using <Badge icon={<ViteIcon />}>Vite</Badge>,{' '}
        <Badge icon={<DevIcon icon={`devicon-react-original`} />}>React </Badge>,{' '}
        <Badge icon={<DevIcon icon={`devicon-tailwindcss-plain`} />}>Tailwind</Badge> & others.
      </span>
      <p>Please take a look around, and get in touch if you&apos;re currently hiring.</p>
      <hr className={`print:hidden ${utils.hr}`} />
      <em>James Macmillan</em>
    </Prose>
  );
};
