import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CoverLetter } from './CoverLetter';

export default {
  title: 'content/sections/CoverLetter',
  component: CoverLetter,
} as ComponentMeta<typeof CoverLetter>;

const Template: ComponentStory<typeof CoverLetter> = () => <CoverLetter />;

export const Default = Template.bind({});
Default.args = {};
