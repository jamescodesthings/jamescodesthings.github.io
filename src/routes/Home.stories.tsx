import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Theme, ThemeContext } from '../context/ThemeContext';
import { Home } from './Home';

export default {
  component: Home,
  title: 'routes/Home',
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = () => <Home />;
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
