import React, { useState } from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { themeCreator } from '../themes';

export const ThemeContext = React.createContext(
  (_themeName: string): void => {},
);

export const ThemeProvider: React.FC = props => {
  // Read current theme from localStorage or maybe from an api
  const curThemeName = localStorage.getItem('appTheme') || 'lightTheme';

  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState(curThemeName);

  // Get the theme object by theme name
  const theme = themeCreator(themeName);

  const setThemeName = (themeChange: string): void => {
    localStorage.setItem('appTheme', themeChange);
    _setThemeName(themeChange);
  };

  return (
    <ThemeContext.Provider value={setThemeName}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
