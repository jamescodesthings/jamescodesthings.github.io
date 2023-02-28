import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Interests } from './Interests';
import { marginDecorator } from '../../utils/MarginDecorator';

export default {
  title: 'content/sidebar/Interests',
  component: Interests,
} as ComponentMeta<typeof Interests>;

const Template: ComponentStory<typeof Interests> = () => <Interests />;

export const Default = Template.bind({});
Default.decorators = [marginDecorator];
Default.args = {};
