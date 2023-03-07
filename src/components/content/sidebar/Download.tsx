import Icon from '../../../assets/svg/socials/DownloadCV.svg';
import IconDark from '../../../assets/svg/socials/DownloadCVDark.svg';
import spacing from '../../../styles/spacing.module.pcss';
import styles from './Socials.module.pcss';

export const Download = () => (
  <section className={`${styles.wrapper}`}>
    <a
      href="/assets/cv/cv.pdf"
      className={`${styles.button} ${spacing.mbHalf}`}
      target="_blank"
      rel="noreferrer"
      title="Download my CV in Light Mode"
      download={`James Macmillan.pdf`}
    >
      <Icon />
    </a>
    <a
      href="/assets/cv/dark-cv.pdf"
      className={`${styles.button} ${spacing.mbHalf}`}
      target="_blank"
      rel="noreferrer"
      title="Download my CV in Dark Mode"
      download={`James Macmillan.pdf`}
    >
      <IconDark />
    </a>
  </section>
);
