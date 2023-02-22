import { Prose } from '../typography/Prose';
import { SkillGroup, skills as dataSkills, Sortable } from './data/Skills';
import { ReactNode, useEffect, useState } from 'react';
import { DevIcon } from '../ui/DevIcon';
import styles from './SkillsContent.module.pcss';
import spacing from '../../styles/spacing.module.pcss';
import { DevIconName } from '../../types/DevIconName';

const useColoredIcons = true;

const getIcon = (icon: ReactNode | DevIconName): ReactNode => {
  if (typeof icon === 'string') {
    const iconClass = `${useColoredIcons ? 'colored' : ''}`;
    return <DevIcon icon={icon as DevIconName} className={`text-3xl ${iconClass} `}></DevIcon>;
  } else {
    return icon;
  }
};

const sortFunction = (a: Sortable, b: Sortable): number => {
  const orderA = a?.order ?? 9999;
  const orderB = b?.order ?? 9999;

  return orderA - orderB;
};

export const SkillsContent = () => {
  const initial: SkillGroup[] = [];
  const [skills, setSkills] = useState(initial);

  useEffect(() => {
    const sortedSkills = dataSkills;
    sortedSkills.forEach(skillGroup => skillGroup.skills.sort(sortFunction));
    sortedSkills.sort(sortFunction);

    setSkills(sortedSkills);
  });

  return (
    <>
      <Prose className={'text-xs md:text-sm'}>
        <p>
          I have a wide variety of skills using different technology stacks. Below is a representative list of some of
          the languages, frameworks, and tools I work with.
        </p>
        <p>
          Over the last decade I&apos;ve picked up a wealth of experience in web and mobile application development.
          This has lead to lots of experience with CI/CD, UX/UI Design, Unit Testing, DBMS, Performance Optimisation,
          and more.
        </p>
        <p>I have also mentored other developers and I&apos;m used to working with an Agile development methodology.</p>
      </Prose>
      <article className={`${spacing.mall}`}>
        {skills.map(skillGroup => (
          <div className={`${styles.skillGroup}`} key={skillGroup.slug}>
            <div className={`${styles.skill}`}>
              {getIcon(skillGroup.icon)}
              <h5>{skillGroup.name}</h5>
            </div>
            {skillGroup?.skills?.map(skill => (
              <div className={`${styles.skill}`} key={skill?.slug}>
                {getIcon(skill?.icon)}
                <h5>{skill?.name}</h5>
              </div>
            ))}
          </div>
        ))}

        <div className={`${styles.skillGroup} flex-nowrap`}>
          <div className={`${styles.skill}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2.5 24 24" width="24" fill="currentColor">
              <path d="M3.656 17.979A1 1 0 0 1 2 17.243V15a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8.003l-4.347 2.979zm.844-3.093a.536.536 0 0 0 .26-.069l2.355-1.638A1 1 0 0 1 7.686 13H12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5c0 .54.429.982 1 1 .41.016.707.083.844.226.128.134.135.36.156.79.003.063.003.177 0 .37a.5.5 0 0 0 .5.5z"></path>
              <path d="M16 10.017a7.136 7.136 0 0 0 0 .369v-.37c.02-.43.028-.656.156-.79.137-.143.434-.21.844-.226.571-.018 1-.46 1-1V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5V2a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2v2.243a1 1 0 0 1-1.656.736L16 13.743v-3.726z"></path>
            </svg>
            <h5>More</h5>
          </div>
        </div>
      </article>

      <Prose className={'text-xs md:text-sm'}>
        <p>
          This list is by no means exhaustive. If you&apos;d like to know if I&apos;ve used a language or framework
          please reach out.
        </p>
      </Prose>
    </>
  );
};
