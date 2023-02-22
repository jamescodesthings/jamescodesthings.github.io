import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SkillsContent } from './SkillsContent';
import { marginDecorator } from '../utils/MarginDecorator';

export default {
  title: 'content/SkillsContent',
  component: SkillsContent,
} as ComponentMeta<typeof SkillsContent>;

const Template: ComponentStory<typeof SkillsContent> = () => <SkillsContent />;

export const Default = Template.bind({});
Default.decorators = [marginDecorator];
Default.args = {};
