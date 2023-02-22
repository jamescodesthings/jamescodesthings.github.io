import React from 'react';
import { Prose } from '../typography/Prose';
import { Badge } from '../ui/Badge';
import { ViteIcon } from '../icons/ViteIcon';
import { ReactIcon } from '../icons/ReactIcon';
import { TailwindIcon } from '../icons/TailwindIcon';

import utils from '../../styles/utils.module.pcss';
import { Highlight } from '../typography/Highlight';

export const CoverLetterContent = () => {
  return (
    <Prose>
      <p>
        Hi, thanks for taking the time to check out my CV. I&apos;m <Highlight>James Macmillan</Highlight>, a Senior
        Software Engineer based in The Midlands, UK. I&apos;ve worked on a variety of Full Stack Web Development and
        Cross Platform Mobile Development projects.
      </p>
      <p>
        I have 10+ years commercial web development experience, and 5+ years commercial cross platform mobile
        development experience.
      </p>
      <p>I am currently looking for full or mostly remote roles as a Senior, Principal, or Lead Developer.</p>
      <p>
        My ideal stack is Node.js or .net core on the back end, with React & Tailwind on the front. Having said this, I
        have significant experience with a variety of stacks.{/*todo: add anchor link*/}
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
        <Badge icon={<ReactIcon />}>React </Badge>, <Badge icon={<TailwindIcon />}>Tailwind</Badge> & others.
      </span>
      <p>Please take a look around, and get in touch if you&apos;re currently hiring.</p>
      <hr className={`print:hidden ${utils.hr}`} />
      <em>James Macmillan</em>
    </Prose>
  );
};
