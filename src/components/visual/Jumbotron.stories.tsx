import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Jumbotron } from './Jumbotron';

export default {
  jumbotron: 'Jumbotron',
  component: Jumbotron,
} as ComponentMeta<typeof Jumbotron>;

const Template: ComponentStory<typeof Jumbotron> = args => <Jumbotron {...args} />;

type LabelProps = {
  title: string;
};
const Label = ({ title }: LabelProps) => <h1 className={`text-white bg-stone-700 p-2 px-6 rounded`}>{title}</h1>;

export const Default = Template.bind({});
Default.args = {
  children: <Label title={'Jumbotron'} />,
};

export const Rounded = Template.bind({});
Rounded.args = {
  className: 'jumbo-round',
  children: <Label title={'Jumbotron Round'} />,
};
