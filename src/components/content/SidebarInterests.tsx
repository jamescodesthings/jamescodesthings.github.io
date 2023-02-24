import { Prose } from '../typography/Prose';
import Icon from '../../assets/svg/icofont/camera-alt.svg';
import { SidebarHeading } from '../headings/SidebarHeading';
import spacing from '../../styles/spacing.module.pcss';

export const SidebarInterests = () => (
  <>
    <section className={`${spacing.mtDouble}`}>
      <SidebarHeading title={`Interests`} icon={<Icon />} className={`${spacing.mbHalf}`}></SidebarHeading>
      <Prose>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem dolor dolorem explicabo inventore ipsa
          laudantium nihil quis saepe vero, voluptatibus? Deleniti dolorum eaque ex maiores officia recusandae
          voluptates. Animi, rem!
        </p>
      </Prose>
    </section>
  </>
);
