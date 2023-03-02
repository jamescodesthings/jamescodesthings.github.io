import React from 'react';
import { Badge } from '../../ui/Badge';
import ViteIcon from '../../../assets/svg/dev/vite.svg';
import { Highlight } from '../../typography/Highlight';
import { DevIcon } from '../../ui/DevIcon';
import utils from '../../../styles/utils.module.pcss';
import { Prose } from '../../typography/Prose';

export const CoverLetterContent = () => {
  return (
    <Prose>
      <p>
        Hey, I&apos;m <Highlight>James</Highlight>, a Senior Software Engineer based in The Midlands. Thanks for taking
        the time to check out my CV.
      </p>
      <p>I am currently looking for full-time, remote roles as a Senior Developer.</p>
      <p>
        I have <Highlight>over 10 years</Highlight> commercial web development experience, and{' '}
        <Highlight>over 5 years</Highlight> commercial cross platform mobile development experience.
      </p>
      <p>
        My ideal stack is <Highlight>Node.js</Highlight> or <Highlight>.net core</Highlight> on the back end, with{' '}
        <Highlight>React</Highlight> & <Highlight>Tailwind</Highlight> on the front. But, I have significant experience
        in a variety of Front End and Server Side technologies.
        {/*todo: add anchor link*/}
      </p>
      <p>
        I started web development at 12 years old. My core web skills developed at the same time as the web, and when
        the web went mobile, so did I.
      </p>
      <p>
        I&apos;d make a great addition to any dev team, my strengths are in full stack development and design in the
        javascript ecosystem. I&apos;ve worked with a variety of different team structures, processes and tech.
      </p>
      <span>
        This <span className={`print:hidden`}>website</span>
        <span className={`hidden print:inline`}>CV</span> was written with ❤️ in the Midlands, Using{' '}
        <Badge icon={<ViteIcon />}>Vite</Badge>,{' '}
        <Badge icon={<DevIcon icon={`devicon-react-original`} />}>React </Badge>,{' '}
        <Badge icon={<DevIcon icon={`devicon-tailwindcss-plain`} />}>Tailwind</Badge> & others.
      </span>
      <hr className={`print:invisible ${utils.hr}`} />
      <em>James Macmillan</em>
    </Prose>
  );
};
