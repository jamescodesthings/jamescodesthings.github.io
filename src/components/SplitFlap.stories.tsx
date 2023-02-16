import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SplitFlap } from './SplitFlap';

export default {
  name: 'SplitFlap',
  component: SplitFlap,
} as ComponentMeta<typeof SplitFlap>;

const Template: ComponentStory<typeof SplitFlap> = args => <SplitFlap {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 'J',
};

export const Rainbow = Template.bind({});
Rainbow.args = {
  value: 'J',
  className: 'rainbow',
};
