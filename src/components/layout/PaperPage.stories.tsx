import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PaperPage } from './PaperPage';
import { CenteredLabel } from '../utils/Label';

export default {
  title: 'layout/PaperPage',
  component: PaperPage,
} as ComponentMeta<typeof PaperPage>;

const Template: ComponentStory<typeof PaperPage> = args => <PaperPage {...args} />;

export const Default = Template.bind({});
Default.decorators = [story => <div className="container m-auto">{story()}</div>];
Default.args = {
  children: <CenteredLabel title={'Printable Paper Page'} />,
};

export const Textured = Template.bind({});
Textured.decorators = [...Default.decorators];
Textured.args = {
  ...Default.args,
  textureName: 'textured-paper',
};
