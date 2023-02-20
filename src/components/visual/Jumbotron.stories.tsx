import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Jumbotron } from './Jumbotron';
import { Label } from '../utils/Label';

export default {
  jumbotron: 'Jumbotron',
  component: Jumbotron,
} as ComponentMeta<typeof Jumbotron>;

const Template: ComponentStory<typeof Jumbotron> = args => <Jumbotron {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <Label title={'Jumbotron'} />,
};

export const Rounded = Template.bind({});
Rounded.args = {
  className: 'jumbo-round',
  children: <Label title={'Jumbotron Round'} />,
};
