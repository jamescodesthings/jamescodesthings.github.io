import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './ErrorPage';

const Home = lazy(() => import('./Home'));

export const Root = (
  <>
    <Route errorElement={<ErrorPage />}>
      <Route path="/" element={<Home />}></Route>
    </Route>
  </>
);

export default Root;
