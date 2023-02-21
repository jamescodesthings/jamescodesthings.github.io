import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Avatar } from './Avatar';

export default {
  title: 'ui/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = args => <Avatar />;

export const Default = Template.bind({});
Default.decorators = [story => <div className={'w-96'}>{story()}</div>];
Default.args = {};
