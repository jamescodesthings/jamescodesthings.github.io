import { ReactNode, useEffect, useState } from 'react';
import { skills as skillsList, Sortable } from '../../../data/Skills';
import { Prose } from '../../typography/Prose';
import { DevIcon } from '../../ui/DevIcon';
import { DevIconName } from '../../../types/DevIconName';
import { Badge } from '../../ui/Badge';

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
      <Prose>
        <p>
          Here&apos;s a quick overview of the technologies and tools I&apos;ve worked with over the years. If
          there&apos;s something specific you&apos;re curious about that&apos;s not listed, feel free to reach out —
          there&apos;s a good chance I&apos;ve come across it.
        </p>
        <p>
          Over the last decade, I&apos;ve built up a broad range of experience in web and mobile development.
          That&apos;s included everything from UX/UI design and performance tuning to unit testing, CI/CD pipelines,
          software architecture, and working with various databases.
        </p>
        <p>
          I&apos;ve also had the chance to lead and mentor developers at all levels, and I&apos;ve worked across a mix
          of teams and processes — though I&apos;m happiest in a well-run Agile environment with good people and a clear
          purpose.
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
