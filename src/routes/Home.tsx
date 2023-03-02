import { Projects } from '../components/sections/Projects';
import { Skills } from '../components/sections/Skills';
import { Experience } from '../components/sections/Experience';
import { CoverLetter } from '../components/sections/CoverLetter';
import { HomeJumbo } from '../components/sections/HomeJumbo';
import { Breakpoint } from '../components/utils/Breakpoint';

/**
 * Home
 * @description The main/home/landing page for codesthings.com
 * @todo pull theme stuff up if/when adding router
 */
export const Home = () => {
  return (
    <>
      <HomeJumbo />
      <CoverLetter />
      <Experience />
      <Skills />
      <Projects />
    </>
  );
};

export default Home;
