import { Prose } from '../../typography/Prose';
import { SidebarHeading } from '../../headings/SidebarHeading';
import spacing from '../../../styles/spacing.module.pcss';
import { Highlight } from '../../typography/Highlight';

export const Interests = () => (
  <>
    <section className={`${spacing.mtDouble}`}>
      <SidebarHeading title={`Interests`} className={`${spacing.mbHalf}`}></SidebarHeading>
      <Prose>
        <p>
          Outside of work, I&apos;m a keen photographer and avid reader, and I&apos;ve recently been getting really into
          3D modelling. My interests shift and grow over time, but a few creative passions have stuck with me.
        </p>
        <p>
          I enjoy learning new things to stretch my thinking and grow as a developer — over the past few years I&apos;ve
          explored <Highlight>game programming</Highlight>, <Highlight>machine learning</Highlight>, and{' '}
          <Highlight>parametric modelling</Highlight>. Picking up new paradigms and ways of thinking helps me stay sharp
          and keeps my curiosity alive.
        </p>
      </Prose>
    </section>
  </>
);
