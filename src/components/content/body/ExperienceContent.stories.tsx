import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ExperienceContent } from './ExperienceContent';
import { marginDecorator } from '../../utils/MarginDecorator';

export default {
  title: 'content/body/ExperienceContent',
  component: ExperienceContent,
} as ComponentMeta<typeof ExperienceContent>;

const Template: ComponentStory<typeof ExperienceContent> = () => <ExperienceContent />;

export const Default = Template.bind({});
Default.decorators = [marginDecorator];
Default.args = {};
