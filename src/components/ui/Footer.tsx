import { Container } from './Container';
import utils from '../../styles/utils.module.pcss';
import spacing from '../../styles/spacing.module.pcss';
import styles from './Footer.module.pcss';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <Container hideInPrint={true}>
    <footer className={`${styles.footer}`}>
      <div className="sm:flex sm:items-center sm:justify-between">
        <Link to={`/`} className={`${styles.logoAndName} ${spacing.mb} sm:!m-0`}>
          <img src="/src/assets/favicon/favicon-color.svg" className={`${spacing.mrHalf} w-8`} alt="CodesThings Logo" />
          <span className={`${styles.name}`}>CodesThings.com</span>
        </Link>
        <ul className={`${styles.footerLinks} ${spacing.mb} sm:!m-0`}>
          <li>
            <Link to={'/about-cookies'} className={`${styles.footerLink} ${spacing.mrHalf}`}>
              About Cookies
            </Link>
          </li>
          <li>
            <Link to={'/privacy-notice'} className={`${styles.footerLink}`}>
              Privacy Notice
            </Link>
          </li>
        </ul>
      </div>
      <hr className={`${utils.hr} ${spacing.myHalf}`} />
      <span className={`${styles.copyright}`}>© 2023 James Macmillan. All Rights Reserved.</span>
    </footer>
  </Container>
);
