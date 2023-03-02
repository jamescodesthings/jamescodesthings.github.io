import { Jumbotron } from '../ui/Jumbotron';
import { TitleWithBackground } from '../typography/TitleWithBackground';
import { DarkModeSwitch } from '../ui/DarkModeSwitch';

import styles from './HomeJumbo.module.pcss';

export function HomeJumbo() {
  return (
    <Jumbotron className={`jumbo-round`}>
      <main className={`${styles.main} h-full`}>
        <DarkModeSwitch className={`right`} />
        <div className={`${styles.jumboMainContent}`}>
          <TitleWithBackground title={'James Macmillan'} gradient={'sublime'} className={`before:bg-gradient-to-bl`} />
        </div>
      </main>
    </Jumbotron>
  );
}
