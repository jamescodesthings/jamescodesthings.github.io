import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Jumbotron } from './Jumbotron';
import { CenteredLabel } from '../utils/Label';

export default {
  title: 'ui/Jumbotron',
  component: Jumbotron,
} as ComponentMeta<typeof Jumbotron>;

const Template: ComponentStory<typeof Jumbotron> = args => <Jumbotron {...args} />;

export const Default = Template.bind({});
Default.decorators = [story => <div className={'h-screen p-4'}>{story()}</div>];
Default.args = {
  children: <CenteredLabel title={'Jumbotron'} />,
};

export const Rounded = Template.bind({});
Rounded.decorators = [...Default.decorators];
Rounded.args = {
  className: 'jumbo-round',
  children: <CenteredLabel title={'Jumbotron Round'} />,
};
