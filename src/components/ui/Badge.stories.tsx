import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Badge } from './Badge';
import { ViteIcon } from '../icons/ViteIcon';

export default {
  title: 'ui/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = args => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: <ViteIcon />,
  children: <>Vite</>,
};
