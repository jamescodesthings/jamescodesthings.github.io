import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CoverLetterContent } from './CoverLetterContent';
import { marginDecorator } from '../utils/MarginDecorator';

export default {
  title: 'content/CoverLetterContent',
  component: CoverLetterContent,
} as ComponentMeta<typeof CoverLetterContent>;

const Template: ComponentStory<typeof CoverLetterContent> = () => <CoverLetterContent />;

export const Default = Template.bind({});
Default.decorators = [marginDecorator];
Default.args = {};
