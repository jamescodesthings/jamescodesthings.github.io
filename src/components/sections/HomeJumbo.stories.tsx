import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { HomeJumbo } from './HomeJumbo';

export default {
  title: 'content/sections/HomeJumbo',
  component: HomeJumbo,
} as ComponentMeta<typeof HomeJumbo>;

const Template: ComponentStory<typeof HomeJumbo> = () => <HomeJumbo />;

export const Default = Template.bind({});
Default.args = {};
