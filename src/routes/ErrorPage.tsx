import { Link, useRouteError } from 'react-router-dom';

import styles from './ErrorPage.module.pcss';

/**
 * Error Page
 * @constructor
 */
export default function ErrorPage() {
  const error: any = useRouteError();

  let title = 'Oops!';
  let leader;
  let message = <>Sorry, something went wrong.</>;

  if (error?.status === 404) {
    console.log('Route not found');
    const missing = window.location.pathname;
    title = 'Where are you going?';
    leader = 'This is embarrassing';
    message = (
      <>
        The page at <span className={styles.highlight}>{missing}</span> isn&apos;t there anymore.
      </>
    );
  }
  console.error(error);

  return (
    <main className={`${styles.main}`}>
      <article className={`${styles.errorWrapper}`}>
        <h1 className={`${styles.title}`}>{title}</h1>
        {leader && <p className={`${styles.leader}`}>{leader}</p>}
        <p className={`${styles.message}`}>{message}</p>
        <p className={`${styles.linkBackMessage}`}>
          My guess is you want to go{' '}
          <Link to={'/'} className={`${styles.link}`}>
            Home
          </Link>
          .
        </p>
      </article>
    </main>
  );
}
