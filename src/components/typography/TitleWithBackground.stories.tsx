import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TitleWithBackground } from './TitleWithBackground';

export default {
  title: 'TitleWithBackground',
  component: TitleWithBackground,
} as ComponentMeta<typeof TitleWithBackground>;

const Template: ComponentStory<typeof TitleWithBackground> = args => <TitleWithBackground {...args} />;

export const Default = Template.bind({});
Default.decorators = [
  story => (
    <div className={'flex flex-col justify-center items-center w-full h-screen'}>
      {story()}
      <a
        target={'_blank'}
        rel={'noreferrer'}
        href="https://hypercolor.dev/"
        className={'block mt-6 font-medium text-blue-600 dark:text-blue-500 hover:underline'}
      >
        More Gradients
      </a>
    </div>
  ),
];
Default.args = {
  title: 'James Macmillan',
};
