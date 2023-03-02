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
          I&apos;m a keen photographer, avid reader, and Cyclist. I find my interests changing over time but the main
          few stay the same.
        </p>
        <p>
          When I&apos;m not working, I like to continuously learn. In the last few years I&apos;ve taken up{' '}
          <Highlight>Game Programming</Highlight>, <Highlight>Machine Learning</Highlight>, and{' '}
          <Highlight>Data Science</Highlight>. I find that learning new paradigms and languages keeps me sharp.
        </p>
      </Prose>
    </section>
  </>
);
