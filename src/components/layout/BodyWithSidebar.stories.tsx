import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BodyWithSidebar } from './BodyWithSidebar';
import { CenteredLabel } from '../utils/Label';

export default {
  title: 'layout/BodyWithSidebar',
  component: BodyWithSidebar,
} as ComponentMeta<typeof BodyWithSidebar>;

const Template: ComponentStory<typeof BodyWithSidebar> = args => <BodyWithSidebar {...args} />;

export const Default = Template.bind({});
Default.decorators = [story => <div className={`w-[80%] m-auto my-4 border-green-700 border`}>{story()}</div>];
Default.args = {
  sidebar: (
    <div className={`border-red-700 border h-96`}>
      <CenteredLabel title={'Sidebar'} />
    </div>
  ),
  children: (
    <>
      <div className={`border-blue-700 border h-96`}>
        <CenteredLabel title={'Content'} />
      </div>
    </>
  ),
};
