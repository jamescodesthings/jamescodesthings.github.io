import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Projects } from './Projects';

export default {
  title: 'content/sections/Projects',
  component: Projects,
} as ComponentMeta<typeof Projects>;

const Template: ComponentStory<typeof Projects> = () => <Projects />;

export const Default = Template.bind({});
Default.args = {};
