import { Theme } from '@material-ui/core';
import { lightTheme } from './light';

export function themeCreator(theme: string): Theme {
  return themeMap[theme];
}

const themeMap: { [key: string]: Theme } = {
  lightTheme,
};
