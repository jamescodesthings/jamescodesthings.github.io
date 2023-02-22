import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ContactInfo } from './ContactInfo';
import { marginDecorator } from '../utils/MarginDecorator';

export default {
  title: 'content/sidebar/ContactInfo',
  component: ContactInfo,
} as ComponentMeta<typeof ContactInfo>;

const Template: ComponentStory<typeof ContactInfo> = () => <ContactInfo />;

export const Default = Template.bind({});
Default.decorators = [marginDecorator];
Default.args = {};
