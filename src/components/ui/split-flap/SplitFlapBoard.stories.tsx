import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SplitFlapBoard } from './SplitFlapBoard';

export default {
  title: 'ui/SplitFlapBoard',
  component: SplitFlapBoard,
} as ComponentMeta<typeof SplitFlapBoard>;

const Template: ComponentStory<typeof SplitFlapBoard> = args => <SplitFlapBoard {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 'Hello World!',
  random: false,
  columns: 8,
  rows: 5,
  splitWords: true,
  center: true,
};
