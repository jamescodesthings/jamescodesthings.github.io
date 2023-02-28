import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Contact } from './Contact';
import { marginDecorator } from '../../utils/MarginDecorator';

export default {
  title: 'content/sidebar/Contact',
  component: Contact,
} as ComponentMeta<typeof Contact>;

const Template: ComponentStory<typeof Contact> = () => <Contact />;

export const Default = Template.bind({});
Default.decorators = [marginDecorator];
Default.args = {};
