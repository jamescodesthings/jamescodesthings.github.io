import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PageHeading } from './PageHeading';
import { CoverLetterIcon } from '../icons/CoverLettericon';
import spacing from '../../styles/spacing.module.pcss';

export default {
  title: 'typography/PageHeading',
  component: PageHeading,
} as ComponentMeta<typeof PageHeading>;

const Template: ComponentStory<typeof PageHeading> = args => <PageHeading {...args} />;

export const Default = Template.bind({});
Default.decorators = [story => <div className={`${spacing.mall}`}>{story()}</div>];
Default.args = {
  icon: <CoverLetterIcon />,
  children: <>Cover Letter</>,
};
