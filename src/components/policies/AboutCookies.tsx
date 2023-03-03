import { Prose } from '../typography/Prose';
import { Container } from '../ui/Container';
import { PaperPage } from '../layout/PaperPage';
import { Link } from 'react-router-dom';
import typography from '../../styles/typography.module.pcss';
import spacing from '../../styles/spacing.module.pcss';

const icoLink = `https://ico.org.uk/for-organisations/guide-to-pecr/guidance-on-the-use-of-cookies-and-similar-technologies/what-are-cookies-and-similar-technologies/`;

export const AboutCookies = () => (
  <Container>
    <PaperPage fixedToPaper={false}>
      <Link to={`/`} className={`${typography.link} ${spacing.mb} block`}>
        &lt; Go Back
      </Link>
      <Prose>
        <h1>
          About Cookies <small className={`opacity-60`}>and Similar Technologies.</small>
        </h1>
        <h2>Summary</h2>
        <p>This website only uses Cookies and Similar Technologies to provide essential functionality only.</p>
        <h2>What are Cookies?</h2>
        <p>
          Cookies are small files saved on your phone, tablet or computer when you visit a website. We use cookies to
          make CodesThings.com work.
        </p>
        <h2>Essential cookies</h2>
        <p>
          Essential cookies store your preferences while you browse CodesThings.com. We do not need to ask permission to
          use them.
        </p>
        <table className={`table-auto`}>
          <thead>
            <tr>
              <td>Name</td>
              <td>Mechanism</td>
              <td>Purpose</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>theme-choice</td>
              <td>LocalStorage</td>
              <td>Used to store your theme choice, if you manually change the website&apos;s theme.</td>
            </tr>
            <tr>
              <td>redirect-path</td>
              <td>LocalStorage</td>
              <td>Used to provide a useful error message, if you navigate to a page that does not exist.</td>
            </tr>
          </tbody>
        </table>
        <h2>Where can I find out more?</h2>
        <p>
          The{' '}
          <a href={icoLink} target="_blank" rel="noreferrer">
            Information Commissioner&apos;s office
          </a>{' '}
          provides up to date information regarding the use of Cookies and Similar Technologies.
        </p>
      </Prose>
    </PaperPage>
  </Container>
);
