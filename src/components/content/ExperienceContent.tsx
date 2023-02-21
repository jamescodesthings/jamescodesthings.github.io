import { Prose } from '../typography/Prose';
import styles from './ExperienceContent.module.pcss';

export const ExperienceContent = () => (
  <>
    <Prose>
      <div className={`${styles.entry}`}>
        <h2>Engineius</h2>
        <p>Summary of stuff and things</p>
      </div>

      <div className={`${styles.entry}`}>
        <h2>Packt</h2>
        <p>Summary of stuff and things</p>
      </div>

      <div className={`${styles.entry}`}>
        <h2>Severn Trent</h2>
        <p>Summary of stuff and things</p>
      </div>
    </Prose>
  </>
);
