import Icon from '../../../assets/svg/socials/DownloadCV.svg';
import IconDark from '../../../assets/svg/socials/DownloadCVDark.svg';
import spacing from '../../../styles/spacing.module.pcss';
import styles from './Socials.module.pcss';
import { useSearchParams } from 'react-router-dom';
import CodesThingsIcon from '../../../assets/favicon/favicon-color.svg';
import { SidebarHeading } from '../../headings/SidebarHeading';
import { DevIcon } from '../../ui/DevIcon';
import typography from '../../../styles/typography.module.pcss';

export const Download = () => {
  const [params] = useSearchParams();
  const printContact = params.get('print_contact') === 'true';

  const printClass = printContact ? styles.printContact : '';
  return (
    <section className={`${styles.wrapper} ${printClass}`}>
      <SidebarHeading icon={<CodesThingsIcon />} className={`!hidden print:!flex`}>
        <a href={`https://codesthings.com`} className={`${typography.externalLink}`} target="_blank" rel="noreferrer">
          https://CodesThings.com/
        </a>
      </SidebarHeading>
      <a
        href="/assets/cv/cv.pdf"
        className={`${styles.button} ${spacing.mbHalf} print:!hidden`}
        target="_blank"
        rel="noreferrer"
        title="Download my CV in Light Mode"
        download={`James Macmillan.pdf`}
      >
        <Icon />
      </a>
      <a
        href="/assets/cv/cv.dark.pdf"
        className={`${styles.button} ${spacing.mbHalf} print:!hidden`}
        target="_blank"
        rel="noreferrer"
        title="Download my CV in Dark Mode"
        download={`James Macmillan.pdf`}
      >
        <IconDark />
      </a>
    </section>
  );
};
