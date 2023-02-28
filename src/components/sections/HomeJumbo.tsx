import { Jumbotron } from '../ui/Jumbotron';
import { TitleWithBackground } from '../typography/TitleWithBackground';
import { SplitFlap } from '../ui/split-flap/SplitFlap';
import { DarkModeSwitch } from '../ui/DarkModeSwitch';

import styles from './HomeJumbo.module.pcss';
import spacing from '../../styles/spacing.module.pcss';

export function HomeJumbo() {
  return (
    <Jumbotron className={`jumbo-round`}>
      <main className={`${styles.main} h-full`}>
        <DarkModeSwitch className={`right`} />
        <div className={`${styles.jumboMainContent}`}>
          <TitleWithBackground title={'James Macmillan'} gradient={'sublime'} className={`before:bg-gradient-to-bl`} />
          <div className={`${styles.splitFlapWrapper}`}>
            <SplitFlap value={'Senior'} className={'word-xs'} random={true} steps={7}></SplitFlap>
            <SplitFlap value={'Software'} className={'word-xs'} random={true} steps={7}></SplitFlap>
            <SplitFlap value={'Engineer'} className={'word-xs'} random={true} steps={7}></SplitFlap>
          </div>
        </div>
      </main>
    </Jumbotron>
  );
}
