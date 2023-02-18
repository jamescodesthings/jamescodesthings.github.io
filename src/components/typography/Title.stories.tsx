import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Title } from './Title';

export default {
  title: 'Title',
  component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = args => <Title {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'James Macmillan',
  subtitle: 'Senior Software Developer',
};

export const TitleOnly = Template.bind({});
TitleOnly.args = {
  title: 'Cover Letter',
};
