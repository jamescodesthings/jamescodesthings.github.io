import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import styles from './Texture.module.pcss';
import { Texture } from './Texture';

export default {
  jumbotron: 'Texture',
  component: Texture,
} as ComponentMeta<typeof Texture>;

const Template: ComponentStory<typeof Texture> = args => <Texture {...args} />;

export const FabricLight = Template.bind({});
FabricLight.decorators = [
  story => (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className={`${styles['texture-preview']}`}>{story()}</div>
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
FabricLight.args = {
  name: 'fabric-light',
};

export const FabricDark = Template.bind({});
FabricDark.decorators = [...FabricLight.decorators];
FabricDark.args = {
  name: 'fabric-dark',
};
