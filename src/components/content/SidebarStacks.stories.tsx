import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SidebarStacks } from './SidebarStacks';
import { marginDecorator } from '../utils/MarginDecorator';

export default {
  title: 'content/sidebar/SidebarStacks',
  component: SidebarStacks,
} as ComponentMeta<typeof SidebarStacks>;

const Template: ComponentStory<typeof SidebarStacks> = () => <SidebarStacks />;

export const Default = Template.bind({});
Default.decorators = [marginDecorator];
Default.args = {};
