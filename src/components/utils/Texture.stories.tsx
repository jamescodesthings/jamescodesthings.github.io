import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import styles from './Texture.module.pcss';
import { Texture } from './Texture';

export default {
  title: 'Texture',
  component: Texture,
} as ComponentMeta<typeof Texture>;

const Template: ComponentStory<typeof Texture> = args => <Texture {...args} />;

export const Default = Template.bind({});
Default.decorators = [
  story => (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className={`${styles.texturePreview}`}>{story()}</div>
        <a
          rel={'noreferrer'}
          target={'_blank'}
          href="https://www.transparenttextures.com/"
          className={'block mt-6 font-medium text-blue-600 dark:text-blue-500 hover:underline text-center'}
        >
          More Textures
        </a>
      </div>
    </>
  ),
];
Default.args = {
  name: 'fabric-light',
};
