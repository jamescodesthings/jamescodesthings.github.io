import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Highlight } from './Highlight';
import { marginDecorator } from '../utils/MarginDecorator';

export default {
  title: 'typography/Highlight',
  component: Highlight,
} as ComponentMeta<typeof Highlight>;

const Template: ComponentStory<typeof Highlight> = args => <Highlight {...args} />;

export const Primary = Template.bind({});
Primary.decorators = [
  story => (
    <>
      <p className={'text-type dark:text-type-dark'}>The test phrase is {story()}.</p>
    </>
  ),
  marginDecorator,
];
Primary.args = {
  children: <>Hello World</>,
  className: 'primary',
};
export const Accent = Template.bind({});
Accent.decorators = [...Primary.decorators];
Accent.args = {
  children: <>Hello World</>,
  className: 'accent',
};

export const Tertiary = Template.bind({});
Tertiary.decorators = [...Primary.decorators];
Tertiary.args = {
  children: <>Hello World</>,
  className: 'tertiary',
};
