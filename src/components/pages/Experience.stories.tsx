import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Experience } from './Experience';

export default {
  title: 'content/pages/Experience',
  component: Experience,
} as ComponentMeta<typeof Experience>;

const Template: ComponentStory<typeof Experience> = () => <Experience />;

export const Default = Template.bind({});
Default.args = {};
