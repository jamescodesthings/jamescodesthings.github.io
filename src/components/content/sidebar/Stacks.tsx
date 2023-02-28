import { Prose } from '../../typography/Prose';
import Icon from '../../../assets/svg/jamicons/layers.svg';
import { SidebarHeading } from '../../headings/SidebarHeading';
import spacing from '../../../styles/spacing.module.pcss';

export const Stacks = () => (
  <>
    <section className={`${spacing.mtDouble}`}>
      <SidebarHeading title={`Stacks`} icon={<Icon />} className={`${spacing.mbHalf}`} />
      <Prose>
        <p>Summary of current happy-stacks.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto blanditiis consequuntur deleniti
          dolores eaque earum eligendi esse fuga fugit, ipsum iure laboriosam maiores necessitatibus nesciunt nostrum
          perspiciatis reiciendis vel.
        </p>
      </Prose>
    </section>
  </>
);
