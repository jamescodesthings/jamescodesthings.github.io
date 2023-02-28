import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProjectsContent } from './ProjectsContent';
import { marginDecorator } from '../../utils/MarginDecorator';

export default {
  title: 'content/body/ProjectsContent',
  component: ProjectsContent,
} as ComponentMeta<typeof ProjectsContent>;

const Template: ComponentStory<typeof ProjectsContent> = () => <ProjectsContent />;

export const Default = Template.bind({});
Default.decorators = [marginDecorator];
Default.args = {};
