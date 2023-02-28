import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Education } from './Education';

export default {
  title: 'content/sections/Education',
  component: Education,
} as ComponentMeta<typeof Education>;

const Template: ComponentStory<typeof Education> = () => <Education />;

export const Default = Template.bind({});
Default.args = {};
