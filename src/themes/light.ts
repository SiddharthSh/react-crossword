import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import * as color from './colors';

export const baseLightTheme = createMuiTheme({
  palette: {
    primary: {
      main: color.primary,
      light: color.primaryLight,
      dark: color.primaryDark,
    },
    secondary: {
      main: color.secondary,
      light: color.secondaryLight,
      dark: color.secondaryDark,
    },
    warning: {
      main: color.warning,
      light: color.warningLight,
      dark: color.warningDark,
    },
    error: {
      main: color.error,
      light: color.errorLight,
      dark: color.errorDark,
    },
    success: {
      main: color.success,
      light: color.successLight,
      dark: color.successDark,
    },
    info: {
      main: color.info,
      light: color.infoLight,
      dark: color.infoDark,
    },
  },
  typography: {
    body2: {
      fontSize: 14,
    },
    button: {
      fontSize: 14,
    },
    h2: {
      fontSize: 64,
    },
    h4: {
      fontSize: 34,
    },
    h5: {
      fontSize: 30,
    },
    h6: {
      fontSize: 24,
    },
    caption: {
      fontSize: 12,
    },
    subtitle1: {
      fontSize: 36,
    },
    subtitle2: {
      fontSize: 16,
    },
  },
});

export const lightTheme = responsiveFontSizes(baseLightTheme);
