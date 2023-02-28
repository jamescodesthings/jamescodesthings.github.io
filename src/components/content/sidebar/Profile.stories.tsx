import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Profile } from './Profile';
import { marginDecorator } from '../../utils/MarginDecorator';

export default {
  title: 'content/sidebar/Profile',
  component: Profile,
} as ComponentMeta<typeof Profile>;

const Template: ComponentStory<typeof Profile> = () => <Profile />;

export const Default = Template.bind({});
Default.decorators = [marginDecorator];
Default.args = {};
