import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EducationContent } from './EducationContent';
import { marginDecorator } from '../utils/MarginDecorator';

export default {
  title: 'content/EducationContent',
  component: EducationContent,
} as ComponentMeta<typeof EducationContent>;

const Template: ComponentStory<typeof EducationContent> = args => <EducationContent />;

export const Default = Template.bind({});
Default.decorators = [marginDecorator];
Default.args = {};
