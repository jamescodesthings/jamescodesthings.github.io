import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Availability } from './Availability';
import { marginDecorator } from '../utils/MarginDecorator';

export default {
  title: 'content/sidebar/Availability',
  component: Availability,
} as ComponentMeta<typeof Availability>;

const Template: ComponentStory<typeof Availability> = args => <Availability />;

export const Default = Template.bind({});
Default.decorators = [marginDecorator];
Default.args = {};
