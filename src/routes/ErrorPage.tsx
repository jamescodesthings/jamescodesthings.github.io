import { useRouteError } from 'react-router-dom';

/**
 * Error Page
 * @todo improve
 * @constructor
 */
export default function ErrorPage() {
  const error: any = useRouteError();

  if (error?.status === 404) {
    console.log('Route not found');
  }
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
}
