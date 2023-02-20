import React from 'react';
import { Prose } from '../../components/typography/Prose';

export const CoverLetterContent = () => (
  <Prose>
    <p>
      Thank you for taking the time to look at my CV. I&apos;m James Macmillan, a Senior Full Stack Web and Mobile
      Developer based in The Midlands, UK.
    </p>
    <p>I am currently seeking remote roles as a Senior, Principal or Lead Developer.</p>
    <p>
      My preferred stack is Node.js, microservice based but I&apos;m experienced with a multitude of tech stacks (see
      below). {/*todo: add anchor link*/}
    </p>
    <p>
      I started web development at 12 years old, and have worked in the industry for my whole adult life. My core web
      skills developed alongside the growth of web as a platform, and when every company needed a mobile app, I adapted
      my skills to cross platform mobile development.
    </p>
    <p>
      I have a strong passion for development, writing clean and maintainable code. I&apos;ve always had a love for web
      and mobile design, and I keep myself up to speed with the latest in development and design trends.
    </p>
    <p>
      I&apos;m currently working as a full stack web & mobile dev on a team with a .net core stack, but have also
      heavily used Node.js stacks. I&apos;m experienced with on-prem and cloud deployments, with significant experience
      in microservice development.
    </p>
    <p>Please take a look around, and get in touch if you&apos;re interested in hiring me.</p>
    <hr className="print:hidden" />
    <em>James Macmillan</em>
  </Prose>
);
