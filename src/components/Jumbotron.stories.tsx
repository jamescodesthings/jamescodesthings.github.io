import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Jumbotron } from './Jumbotron';
import { Title } from './Title';

export default {
  jumbotron: 'Jumbotron',
  component: Jumbotron,
} as ComponentMeta<typeof Jumbotron>;

const Template: ComponentStory<typeof Jumbotron> = args => <Jumbotron {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <Title title="James Macmillan" subtitle="Senior Software Developer"></Title>,
};

export const Rounded = Template.bind({});
Rounded.args = {
  className: 'jumbo-round',
  children: Default.args.children,
};
