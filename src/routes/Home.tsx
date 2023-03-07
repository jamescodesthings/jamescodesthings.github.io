import { Projects } from '../components/sections/Projects';
import { Skills } from '../components/sections/Skills';
import { Experience } from '../components/sections/Experience';
import { CoverLetter } from '../components/sections/CoverLetter';
import { HomeJumbo } from '../components/sections/HomeJumbo';
import { Footer } from '../components/ui/Footer';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  const [params] = useSearchParams();

  const excludeProjects = params.get('exclude_projects') === 'true';
  const excludeCover = params.get('exclude_cover') === 'true';
  const printDark = params.get('print_dark') === 'true';

  useEffect(() => {
    if (redirect) {
      setRedirect('');
      console.log('Redirecting to:', redirect);
      navigate(redirect);
    }
  }, [redirect]);

  useEffect(() => {
    const printDarkClass = 'print-dark';
    if (printDark && !document.body.classList.contains(printDarkClass)) {
      document.body.classList.add(printDarkClass);
    } else if (!printDark && document.body.classList.contains(printDarkClass)) {
      document.body.classList.remove(printDarkClass);
    }
  }, [printDark]);

  return (
    <>
      <HomeJumbo />
      {!excludeCover && <CoverLetter />}
      <Experience />
      <Skills />
      {!excludeProjects && <Projects />}
      <Footer />
    </>
  );
};

export default Home;
