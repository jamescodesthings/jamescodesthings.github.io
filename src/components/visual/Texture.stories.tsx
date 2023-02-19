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

export const BeigePaper = Template.bind({});
BeigePaper.decorators = [...FabricLight.decorators];
BeigePaper.args = {
  name: 'beige-paper',
};

export const BlackPaper = Template.bind({});
BlackPaper.decorators = [...FabricLight.decorators];
BlackPaper.args = {
  name: 'black-paper',
};

export const CardboardFlat = Template.bind({});
CardboardFlat.decorators = [...FabricLight.decorators];
CardboardFlat.args = {
  name: 'cardboard-flat',
};

export const Cardboard = Template.bind({});
Cardboard.decorators = [...FabricLight.decorators];
Cardboard.args = {
  name: 'cardboard',
};

export const CleanGrayPaper = Template.bind({});
CleanGrayPaper.decorators = [...FabricLight.decorators];
CleanGrayPaper.args = {
  name: 'clean-gray-paper',
};

export const CreamPaper = Template.bind({});
CreamPaper.decorators = [...FabricLight.decorators];
CreamPaper.args = {
  name: 'cream-paper',
};

export const ExclusivePaper = Template.bind({});
ExclusivePaper.decorators = [...FabricLight.decorators];
ExclusivePaper.args = {
  name: 'exclusive-paper',
};

export const Groovepaper = Template.bind({});
Groovepaper.decorators = [...FabricLight.decorators];
Groovepaper.args = {
  name: 'groovepaper',
};

export const HandmadePaper = Template.bind({});
HandmadePaper.decorators = [...FabricLight.decorators];
HandmadePaper.args = {
  name: 'handmade-paper',
};

export const LightPaperFibers = Template.bind({});
LightPaperFibers.decorators = [...FabricLight.decorators];
LightPaperFibers.args = {
  name: 'light-paper-fibers',
};

export const LinedPaper2 = Template.bind({});
LinedPaper2.decorators = [...FabricLight.decorators];
LinedPaper2.args = {
  name: 'lined-paper-2',
};

export const NaturalPaper = Template.bind({});
NaturalPaper.decorators = [...FabricLight.decorators];
NaturalPaper.args = {
  name: 'natural-paper',
};

export const NotebookDark = Template.bind({});
NotebookDark.decorators = [...FabricLight.decorators];
NotebookDark.args = {
  name: 'notebook-dark',
};

export const Notebook = Template.bind({});
Notebook.decorators = [...FabricLight.decorators];
Notebook.args = {
  name: 'notebook',
};

export const Paper1 = Template.bind({});
Paper1.decorators = [...FabricLight.decorators];
Paper1.args = {
  name: 'paper-1',
};

export const Paper2 = Template.bind({});
Paper2.decorators = [...FabricLight.decorators];
Paper2.args = {
  name: 'paper-2',
};

export const Paper3 = Template.bind({});
Paper3.decorators = [...FabricLight.decorators];
Paper3.args = {
  name: 'paper-3',
};

export const PaperFibers = Template.bind({});
PaperFibers.decorators = [...FabricLight.decorators];
PaperFibers.args = {
  name: 'paper-fibers',
};

export const Paper = Template.bind({});
Paper.decorators = [...FabricLight.decorators];
Paper.args = {
  name: 'paper',
};

export const RicePaper2 = Template.bind({});
RicePaper2.decorators = [...FabricLight.decorators];
RicePaper2.args = {
  name: 'rice-paper-2',
};

export const RicePaper3 = Template.bind({});
RicePaper3.decorators = [...FabricLight.decorators];
RicePaper3.args = {
  name: 'rice-paper-3',
};

export const RicePaper = Template.bind({});
RicePaper.decorators = [...FabricLight.decorators];
RicePaper.args = {
  name: 'rice-paper',
};

export const Sandpaper = Template.bind({});
Sandpaper.decorators = [...FabricLight.decorators];
Sandpaper.args = {
  name: 'sandpaper',
};

export const SoftWallpaper = Template.bind({});
SoftWallpaper.decorators = [...FabricLight.decorators];
SoftWallpaper.args = {
  name: 'soft-wallpaper',
};

export const TexturedPaper = Template.bind({});
TexturedPaper.decorators = [...FabricLight.decorators];
TexturedPaper.args = {
  name: 'textured-paper',
};
