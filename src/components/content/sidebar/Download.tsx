import { SidebarHeading } from '../../headings/SidebarHeading';
import Icon from '../../../assets/svg/jamicons/watch.svg';
import typography from '../../../styles/typography.module.pcss';

export const Download = () => (
  <section className={`print:hidden`}>
    <SidebarHeading icon={<Icon />} title={'Download CV'}>
      <a
        href="/assets/cv/cv.pdf"
        className={`${typography.externalLink} block`}
        target="_blank"
        rel="noreferrer"
        title="Download my CV in Light Mode"
        download={`James Macmillan.pdf`}
      >
        Light
      </a>
      <a
        href="/assets/cv/dark-cv.pdf"
        className={`${typography.externalLink} block`}
        target="_blank"
        rel="noreferrer"
        title="Download my CV in Dark Mode"
        download={`James Macmillan.pdf`}
      >
        Dark
      </a>
    </SidebarHeading>
  </section>
);
