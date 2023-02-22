import { DecoratorFunction } from '@storybook/csf/dist/story';
import { ReactFramework } from '@storybook/react';
import spacing from '../../styles/spacing.module.pcss';
import React from 'react';

export const marginDecorator: DecoratorFunction<ReactFramework> = story => (
  <div className={`${spacing.mall}`}>{story()}</div>
);
