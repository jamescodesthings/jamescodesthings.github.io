import { Prose } from '../../typography/Prose';
import { SidebarHeading } from '../../headings/SidebarHeading';
import spacing from '../../../styles/spacing.module.pcss';

export const Stacks = () => (
  <section className={`${spacing.mtSidebarFirst}`}>
    <SidebarHeading title={`Stacks`} className={`${spacing.mbHalf}`} />
    <Prose>
      <p>
        My Ideal working stack is Node.js on Lambdas, or in Containers. With a modern RDS & Object Store. On the front
        end I like working in React or another component-based flux framework, with Tailwind and a decent bundler. On
        mobile I like Ionic but I&apos;m currently transitioning to React Native.
      </p>
      <p>
        In the recent past I&apos;ve worked on more traditional stacks, deploying Node & .net core APIs to AWS on
        containers, EC2 instances as well as lambdas. I&apos;ve also worked with multiple static site and SSR deployment
        patterns. My last few roles have used Angular heavily so I&apos;ve got tonnes of Angular experience.
      </p>
    </Prose>
  </section>
);
