import { Prose } from '../../typography/Prose';
import { SidebarHeading } from '../../headings/SidebarHeading';
import spacing from '../../../styles/spacing.module.pcss';

export const Stacks = () => (
  <section className={`${spacing.mtSidebarFirst}`}>
    <SidebarHeading title={`Stacks`} className={`${spacing.mbHalf}`} />
    <Prose>
      <p>
        My favourite stack these days is Node.js running on Lambdas or containers, backed by a solid RDS and object
        storage setup. On the front end, I enjoy working with React (or similar component-based frameworks), styled with
        Tailwind and bundled up nicely. For mobile, I&apos;ve been a long-time fan of Ionic but I&apos;m open to
        exploring other frameworks like React Native or Flutter, depending on the project requirements.
      </p>
      <p>
        That said, I&apos;ve worked across a range of setups — from traditional stacks with Node and .NET Core APIs
        deployed on AWS (via containers, EC2s, and Lambdas), to static and server-side rendered sites. Recently
        I&apos;ve enjoyed working on cloud-native applications in AWS and GCP, leveraging the power of serverless
        architectures and microservices to build scalable and efficient systems.
      </p>
    </Prose>
  </section>
);
