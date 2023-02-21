import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SplitFlapWord } from './SplitFlapWord';

export default {
  title: 'ui/SplitFlapWord',
  component: SplitFlapWord,
} as ComponentMeta<typeof SplitFlapWord>;

const Template: ComponentStory<typeof SplitFlapWord> = args => <SplitFlapWord {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 'James',
  random: false,
};

export const Rainbow = Template.bind({});
Rainbow.args = {
  value: 'James',
  className: 'rainbow',
  random: false,
};

export const Long = Template.bind({});
Long.args = {
  value: 'I am testing a longer sentence, to see how that goes.',
  className: 'rainbow',
  random: false,
};

export const Random = Template.bind({});
Random.args = {
  value: 'Hello World!',
  random: true,
};
