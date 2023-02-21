import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Theme, ThemeContext } from '../context/ThemeContext';
import { PageHome } from './PageHome';

export default {
  component: PageHome,
  title: 'Page/Home',
} as ComponentMeta<typeof PageHome>;

const Template: ComponentStory<typeof PageHome> = () => <PageHome />;
export const Default = Template.bind({});
Default.decorators = [
  (story, { globals: { darkMode } }) => {
    const currentTheme = darkMode ? Theme.Dark : Theme.Light;
    return (
      <ThemeContext.Provider value={{ state: currentTheme, dispatch: value => console.log('Change Theme to', value) }}>
        {story()}
      </ThemeContext.Provider>
    );
  },
];
