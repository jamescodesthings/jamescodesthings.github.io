import WhatsApp from '../../../assets/svg/socials/WhatsAppSkinny.svg';
import LinkedIn from '../../../assets/svg/socials/LinkedInSkinny.svg';
import spacing from '../../../styles/spacing.module.pcss';
import styles from './Socials.module.pcss';

export const Socials = () => (
  <section className={`${styles.wrapper}`}>
    <a
      href={`https://www.linkedin.com/in/jamescodesthings/`}
      className={`${styles.button} ${spacing.mbHalf}`}
      target="_blank"
      rel="noreferrer"
    >
      <LinkedIn />
    </a>

    <a
      aria-label="Chat on WhatsApp"
      href={`https://wa.me/447736667115`}
      className={`${styles.button} ${spacing.mbHalf}`}
      target="_blank"
      rel="noreferrer"
    >
      <WhatsApp />
    </a>
  </section>
);
