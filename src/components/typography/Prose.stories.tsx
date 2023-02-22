import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import spacing from '../../styles/spacing.module.pcss';

import { Prose } from './Prose';

export default {
  title: 'typography/Prose',
  component: Prose,
} as ComponentMeta<typeof Prose>;

const Template: ComponentStory<typeof Prose> = args => <Prose {...args} />;

export const Default = Template.bind({});
Default.decorators = [story => <div className={`${spacing.mall}`}>{story()}</div>];
Default.args = {
  children: (
    <>
      <h1>Lorem ipsum </h1>
      <h2>dolor sit amet</h2>
      <p>
        consectetur adipisicing elit. Ab aliquid aspernatur eum ipsum iure? Adipisci aperiam architecto consequuntur cum
        debitis eaque facilis fugiat hic libero, maiores nostrum nulla quaerat sed.
      </p>
      <ul>
        <li>Item One</li>
        <li>Item Two</li>
        <li>Item Three</li>
      </ul>
    </>
  ),
};
