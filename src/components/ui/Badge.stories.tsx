import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Badge } from './Badge';
import ViteIcon from '../../assets/svg/dev/vite.svg';

import { marginDecorator } from '../utils/MarginDecorator';

import typography from '../../styles/typography.module.pcss';
import { DevIcon } from './DevIcon';

export default {
  title: 'ui/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = args => <Badge {...args} />;

export const Default = Template.bind({});
Default.decorators = [story => <>This is a badge {story()} and we like it.</>, marginDecorator];
Default.args = {
  icon: <ViteIcon />,
  children: <>Vite</>,
};
export const Img = Template.bind({});
Img.decorators = [
  story => <p className={`${typography.default}`}>This is a badge {story()} and we like it.</p>,
  marginDecorator,
];
Img.args = {
  icon: <img src="/assets/icons/nativescript-logo.png" alt={'nativescript eww'} />,
  children: <>Nativescript</>,
};
export const Devicon = Template.bind({});
Devicon.decorators = [
  story => <p className={`${typography.default}`}>This is a badge {story()} and we like it.</p>,
  marginDecorator,
];
Devicon.args = {
  icon: <DevIcon icon={'devicon-html5-plain'} />,
  children: <>HTML</>,
};
