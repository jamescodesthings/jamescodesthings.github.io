import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Stacks } from './Stacks';
import { marginDecorator } from '../../utils/MarginDecorator';

export default {
  title: 'content/sidebar/Stacks',
  component: Stacks,
} as ComponentMeta<typeof Stacks>;

const Template: ComponentStory<typeof Stacks> = () => <Stacks />;

export const Default = Template.bind({});
Default.decorators = [marginDecorator];
Default.args = {};
