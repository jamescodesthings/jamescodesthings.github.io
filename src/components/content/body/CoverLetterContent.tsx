import React, { useContext } from 'react';
import { Badge } from '../../ui/Badge';
import ViteIcon from '../../../assets/svg/dev/vite.svg';
import { Highlight } from '../../typography/Highlight';
import { DevIcon } from '../../ui/DevIcon';
import utils from '../../../styles/utils.module.pcss';
import { Prose } from '../../typography/Prose';
import { SeekingContext } from '../../../context/SeekingContext';

const SeekingContent = () => (
  <>
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
      <Highlight>React</Highlight> & <Highlight>Tailwind</Highlight> on the front. But, I have significant experience in
      a variety of Front End and Server Side technologies.
      {/*todo: add anchor link*/}
    </p>
    <p>
      I started web development at 12 years old. My core web skills developed at the same time as the web, and when the
      web went mobile, so did I.
    </p>
    <p>
      I&apos;d make a great addition to any dev team, my strengths are in full stack development and design in the
      javascript ecosystem. I&apos;ve worked with a variety of different team structures, processes and tech.
    </p>
  </>
);

const NotSeekingContent = () => (
  <>
    <p>
      Hey, I&apos;m <Highlight>James</Highlight>, a Senior Software Engineer based in The Midlands.
    </p>
    <p>
      I&apos;ve been tinkering with code since I was <Highlight>12 years old</Highlight>, and I&apos;m grateful to have
      turned my passion into an awesome career.
    </p>
    <p>
      As a developer, I&apos;m always up for a challenge and love tackling complex problems head-on. I specialize in
      full stack JavaScript development and have experience with <Highlight>Node.JS</Highlight>,{' '}
      <Highlight>React</Highlight>, <Highlight>Tailwind</Highlight>, <Highlight>C#</Highlight>, and many other
      languages.
    </p>
    <p>
      I&apos;ve worked on numerous applications across different sectors and have picked up a wealth of knowledge and
      experience along the way. I love working with all sorts of programming languages. I&apos;ve worked on loads of
      applications across different sectors, and I&apos;ve learned a ton along the way.
    </p>
    <p>
      When I&apos;m not coding, I like to skate, game, or just hang out with my family. My partner and kids mean the
      world to me. There&apos;s nothing better than spending quality time with the people you love most.
    </p>
    <p>
      But enough about me - I&apos;d love to learn more about you and your project. If you&apos;re looking for a
      seasoned developer who&apos;s got the skills and passion to bring your ideas to life, then let&apos;s connect and
      see what we can create together.
    </p>
  </>
);

export const CoverLetterContent = () => {
  const { isSeeking } = useContext(SeekingContext);
  return (
    <Prose>
      {isSeeking && <SeekingContent />}
      {!isSeeking && <NotSeekingContent />}
      <hr className={`print:invisible ${utils.hr}`} />
      <em>James Macmillan</em>
      <div className={'mt-12'}>
        This <span className={`print:hidden`}>website</span>
        <span className={`hidden print:inline`}>CV</span> was written with ❤️ in the Midlands, Using{' '}
        <Badge icon={<ViteIcon />}>Vite</Badge>,{' '}
        <Badge icon={<DevIcon icon={`devicon-react-original`} />}>React </Badge>,{' '}
        <Badge icon={<DevIcon icon={`devicon-tailwindcss-plain`} />}>Tailwind</Badge> & others.
      </div>
    </Prose>
  );
};
