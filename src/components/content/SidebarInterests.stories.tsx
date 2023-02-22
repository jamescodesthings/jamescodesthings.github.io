import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SidebarInterests } from './SidebarInterests';
import { marginDecorator } from '../utils/MarginDecorator';

export default {
  title: 'content/sidebar/SidebarInterests',
  component: SidebarInterests,
} as ComponentMeta<typeof SidebarInterests>;

const Template: ComponentStory<typeof SidebarInterests> = () => <SidebarInterests />;

export const Default = Template.bind({});
Default.decorators = [marginDecorator];
Default.args = {};
