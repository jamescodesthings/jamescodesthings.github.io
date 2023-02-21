import { Prose } from '../typography/Prose';
import styles from './SkillsContent.module.pcss';
import spacing from '../../styles/spacing.module.pcss';

export const SkillsContent = () => (
  <>
    <Prose>
      <article className="${spacing.} prose text-sm font-light">
        <p>
          I have a wide variety of skills using different technology stacks. Below is a representative list of some of
          the languages, frameworks, and tools I work with.
        </p>
        <p>
          Over the last decade I&apos;ve picked up a wealth of experience in web and mobile application development.
          This has lead to lots of experience with CI/CD, UX/UI Design, Unit Testing, DBMS, Performance Optimisation,
          and more.
        </p>
        <p>I have also mentored other developers and I&apos;m used to working with an Agile development methodology.</p>
      </article>
    </Prose>
  </>
);
