import { useSearchParams } from 'react-router-dom';
import WhatsApp from '../../../assets/svg/socials/WhatsAppSkinny.svg';
import WhatsAppLogo from '../../../assets/svg/socials/WhatsAppLogo.svg';
import LinkedIn from '../../../assets/svg/socials/LinkedInSkinny.svg';
import spacing from '../../../styles/spacing.module.pcss';
import styles from './Socials.module.pcss';
import PhoneIcon from '../../../assets/svg/jamicons/phone.svg';
import typography from '../../../styles/typography.module.pcss';
import { SidebarHeading } from '../../headings/SidebarHeading';
import { DevIcon } from '../../ui/DevIcon';

export const Socials = () => {
  const [params] = useSearchParams();
  const printContact = params.get('print_contact') === 'true';

  const printClass = printContact ? styles.printContact : '';

  return (
    <section className={`${styles.wrapper} ${printClass}`}>
      <a
        href={`https://www.linkedin.com/in/jamescodesthings/`}
        className={`${styles.button} ${spacing.mbHalf} print:!hidden`}
        target="_blank"
        rel="noreferrer"
      >
        <LinkedIn />
      </a>
      <SidebarHeading icon={<DevIcon icon={`devicon-linkedin-plain`} />} className={`!hidden print:!flex`}>
        <a
          href={`https://www.linkedin.com/in/jamescodesthings/`}
          className={`${typography.externalLink}`}
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/
          <wbr />
          jamescodesthings
        </a>
      </SidebarHeading>
      <a
        aria-label="Chat on WhatsApp"
        href={`https://wa.me/447736667115`}
        className={`${styles.button} ${spacing.mbHalf} print:!hidden`}
        target="_blank"
        rel="noreferrer"
      >
        <WhatsApp />
      </a>
      <SidebarHeading icon={<WhatsAppLogo />} title={'WhatsApp'} className={`!hidden print:!flex`}>
        <a
          href={`https://wa.me/447736667115`}
          className={`${typography.externalLink}`}
          target="_blank"
          rel="noreferrer"
        >
          +44 7736 667 115
        </a>
      </SidebarHeading>
    </section>
  );
};
