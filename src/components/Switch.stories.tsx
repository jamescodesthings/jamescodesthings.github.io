import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Switch } from './Switch';

export default {
  component: Switch,
  name: 'Switch',
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = args => <Switch {...args} />;

export const Default = Template.bind({});

export const Labelled = Template.bind({});
Labelled.args = {
  children: 'Hello',
};
