import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EducationContent } from './EducationContent';

export default {
  title: 'EducationContent',
  component: EducationContent,
} as ComponentMeta<typeof EducationContent>;

const Template: ComponentStory<typeof EducationContent> = args => <EducationContent {...args} />;

export const Default = Template.bind({});
Default.args = {};
