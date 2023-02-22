import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import spacing from '../../styles/spacing.module.pcss';

import { CoverLetterIcon } from '../icons/CoverLettericon';
import { SidebarHeading } from './SidebarHeading';

export default {
  title: 'typography/SidebarHeading',
  component: SidebarHeading,
} as ComponentMeta<typeof SidebarHeading>;

const Template: ComponentStory<typeof SidebarHeading> = args => <SidebarHeading {...args} />;

export const Default = Template.bind({});
Default.decorators = [story => <div className={`${spacing.mall}`}>{story()}</div>];
Default.args = {
  icon: <CoverLetterIcon />,
  title: 'Cover Letter',
};
export const WithSubheading = Template.bind({});
WithSubheading.decorators = [...Default.decorators];
WithSubheading.args = {
  icon: <CoverLetterIcon />,
  title: 'Cover Letter',
  children: <>Subhead</>,
};
