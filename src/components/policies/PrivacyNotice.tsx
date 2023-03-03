import { Prose } from '../typography/Prose';
import { PaperPage } from '../layout/PaperPage';
import { Link } from 'react-router-dom';
import typography from '../../styles/typography.module.pcss';
import spacing from '../../styles/spacing.module.pcss';
import { Footer } from '../ui/Footer';

const repoLink = `https://github.com/jamescodesthings/jamescodesthings.github.io`;

export const PrivacyNotice = () => (
  <>
    <PaperPage fixedToPaper={false}>
      <Link to={`/`} className={`${typography.link} ${spacing.mb} block`}>
        &lt; Go Back
      </Link>
      <Prose>
        <h1>Privacy Notice</h1>
        <h2>Summary</h2>
        <p>I do not collect, store or process any personal data.</p>
        <h2>Detail</h2>
        <p>
          CodesThings.com is the personal website of James Macmillan. I do not collect any personal data on this
          website, no analytics or tracking are performed. Great care has been taken to ensure this is possible. The
          source code to this website is publicly available here:{' '}
          <a href={repoLink} target="_blank" rel="noreferrer">
            {repoLink}
          </a>
          .
        </p>
        <h2>Cookies</h2>
        <p>
          Please see the <Link to={`/about-cookies`}>Cookie Policy</Link>.
        </p>
        <h2>Contact</h2>
        <p>For any questions or concerns you may contact:</p>
        <ul className={`list-none pl-0 ml-0`}>
          <li className={`pl-0`}>James Macmillan</li>
          <li className={`pl-0`}>+44 7736 667 115</li>
          <li className={`pl-0`}>james@codesthings.com</li>
        </ul>
      </Prose>
    </PaperPage>
    <Footer />
  </>
);
