import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Title } from './Title';
import { marginDecorator } from '../utils/MarginDecorator';

export default {
  title: 'typography/Title',
  component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = args => <Title {...args} />;

export const Default = Template.bind({});
Default.decorators = [marginDecorator];
Default.args = {
  title: 'James Macmillan',
  subtitle: 'Senior Software Developer',
};
