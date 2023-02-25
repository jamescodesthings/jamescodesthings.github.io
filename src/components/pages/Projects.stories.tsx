import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Projects } from './Projects';

export default {
  title: 'content/pages/Projects',
  component: Projects,
} as ComponentMeta<typeof Projects>;

const Template: ComponentStory<typeof Projects> = () => <Projects />;

export const Default = Template.bind({});
Default.args = {};
