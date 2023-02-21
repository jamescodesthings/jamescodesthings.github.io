import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SplitFlap } from './SplitFlap';

export default {
  title: 'ui/SplitFlap',
  component: SplitFlap,
} as ComponentMeta<typeof SplitFlap>;

const Template: ComponentStory<typeof SplitFlap> = args => <SplitFlap {...args} />;

export const Default = Template.bind({});
Default.decorators = [story => <div className="flex">{story()}</div>];
Default.args = {
  value: 'J',
};

export const Rainbow = Template.bind({});
Rainbow.decorators = [...Default.decorators];
Rainbow.args = {
  value: 'J',
  className: 'rainbow',
};

export const Adjective = Template.bind({});
Adjective.decorators = [...Default.decorators];
Adjective.args = {
  value: 'Senior',
  className: 'word',
  type: 'adjective',
};

export const Noun = Template.bind({});
Noun.decorators = [...Default.decorators];
Noun.args = {
  value: 'Software',
  className: 'word',
  type: 'noun',
};
export const NounAlternative = Template.bind({});
NounAlternative.decorators = [...Default.decorators];
NounAlternative.args = {
  value: 'Engineer',
  className: 'word',
  type: 'noun',
};
export const SmallWord = Template.bind({});
SmallWord.decorators = [...Default.decorators];
SmallWord.args = {
  value: 'Engineer',
  className: 'word-sm',
  type: 'noun',
};
export const ExtraSmallWord = Template.bind({});
ExtraSmallWord.decorators = [...Default.decorators];
ExtraSmallWord.args = {
  value: 'Engineer',
  className: 'word-xs',
  type: 'noun',
};
