import { Projects } from '../components/sections/Projects';
import { Skills } from '../components/sections/Skills';
import { Experience } from '../components/sections/Experience';
import { CoverLetter } from '../components/sections/CoverLetter';
import { HomeJumbo } from '../components/sections/HomeJumbo';
import { Footer } from '../components/ui/Footer';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';

/**
 * Home
 * @description The main/home/landing page for codesthings.com
 * @todo pull theme stuff up if/when adding router
 */
export const Home = () => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useLocalStorage('redirect-path', '');

  useEffect(() => {
    if (redirect) {
      setRedirect('');
      console.log('Redirecting to:', redirect);
      navigate(redirect);
    }
  }, [redirect]);
  return (
    <>
      <HomeJumbo />
      <CoverLetter />
      <Experience />
      <Skills />
      <Projects />
      <Footer />
    </>
  );
};

export default Home;
