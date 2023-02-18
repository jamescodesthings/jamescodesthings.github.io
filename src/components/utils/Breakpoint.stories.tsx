import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Breakpoint } from './Breakpoint';

export default {
  title: 'Breakpoint',
  component: Breakpoint,
} as ComponentMeta<typeof Breakpoint>;

const Template: ComponentStory<typeof Breakpoint> = () => <Breakpoint />;

export const Default = Template.bind({});
