import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import { AboutCookies } from '../components/policies/AboutCookies';
import { PrivacyNotice } from '../components/policies/PrivacyNotice';

const Home = lazy(() => import('./Home'));

export const Root = (
  <>
    <Route errorElement={<ErrorPage />}>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about-cookies" element={<AboutCookies />}></Route>
      <Route path="/privacy-notice" element={<PrivacyNotice />}></Route>
    </Route>
  </>
);

export default Root;
