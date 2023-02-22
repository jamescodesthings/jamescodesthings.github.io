import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SidebarProfile } from './SidebarProfile';
import { marginDecorator } from '../utils/MarginDecorator';

export default {
  title: 'content/sidebar/SidebarProfile',
  component: SidebarProfile,
} as ComponentMeta<typeof SidebarProfile>;

const Template: ComponentStory<typeof SidebarProfile> = () => <SidebarProfile />;

export const Default = Template.bind({});
Default.decorators = [marginDecorator];
Default.args = {};
