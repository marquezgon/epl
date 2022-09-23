import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import themeConfig from './utils/themeConfig';

let theme = createTheme(themeConfig);

declare module '@mui/material/styles' {
  interface Palette {
    primary: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    primary?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    primary: true;
    gray: true;
  }
}

declare module '@mui/material/AppBar' {
  interface ButtonPropsColorOverrides {
    primary: true;
  }
}

theme = responsiveFontSizes(theme);

export default theme;