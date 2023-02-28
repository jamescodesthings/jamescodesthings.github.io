import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Skills } from './Skills';

export default {
  title: 'content/sections/Skills',
  component: Skills,
} as ComponentMeta<typeof Skills>;

const Template: ComponentStory<typeof Skills> = () => <Skills />;

export const Default = Template.bind({});
Default.args = {};
