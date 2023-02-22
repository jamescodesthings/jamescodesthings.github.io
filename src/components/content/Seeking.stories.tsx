import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Seeking } from './Seeking';
import { marginDecorator } from '../utils/MarginDecorator';

export default {
  title: 'content/sidebar/Seeking',
  component: Seeking,
} as ComponentMeta<typeof Seeking>;

const Template: ComponentStory<typeof Seeking> = () => <Seeking />;

export const Default = Template.bind({});
Default.decorators = [marginDecorator];
Default.args = {};
