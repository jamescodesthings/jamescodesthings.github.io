import { ReactNode, useEffect, useState } from 'react';
import { skillsList, Sortable } from '../../../data/Skills';
import { Prose } from '../../typography/Prose';
import { DevIcon } from '../../ui/DevIcon';
import { DevIconName } from '../../../types/DevIconName';
import { Badge } from '../../ui/Badge';
import spacing from '../../../styles/spacing.module.pcss';

const getIcon = (icon: ReactNode | DevIconName): ReactNode => {
  if (typeof icon === 'string') {
    return <DevIcon icon={icon as DevIconName}></DevIcon>;
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
  const initial = skillsList;
  const [skills, setSkills] = useState(initial);

  useEffect(() => {
    const sortedSkills = skillsList.sort(sortFunction);
    setSkills(sortedSkills);
  });

  return (
    <>
      <Prose className={'text-xs md:text-sm'}>
        <p>
          Below you will find a summary of some of the key technologies and tooling that I have experience with. If you
          would like to know if I&apos;ve used a particular technology that&apos;s not listed, please get in touch.
        </p>
        <p>
          Over the last decade I&apos;ve picked up a wealth of experience in web and mobile application development.
          This has lead to lots of experience with UX/UI Design, Unit Testing, CI/CD, Software Architecture, DBMS,
          Performance Optimisation, and more.
        </p>
        <p>
          Throughout my career I have mentored and lead other developers of varying skill levels. I&apos;ve worked in a
          variety of teams with a variety of processes, and I&apos;m most comfortable with Agile methodologies.
        </p>
      </Prose>
      <article className={`flex flex-wrap `}>
        {skills?.map(skill => (
          <Badge key={skill?.slug} icon={getIcon(skill?.icon)} className={`mr-2 mb-2`}>
            {skill?.name}
          </Badge>
        ))}
      </article>
    </>
  );
};
