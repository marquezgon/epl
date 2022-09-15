import {
  lightRed,
  mainRed,
  darkRed,
  lightYellow,
  mainYellow,
  darkYellow,
  lightBlue,
  mainBlue,
  darkBlue,
  white
} from './colors';

const themeConfig = {
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          top: '8px'
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '.9rem'
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: white
        }
      }
    }
  },
  palette: {
    primary: {
      light: lightRed,
      main: mainRed,
      dark: darkRed,
      contrastText: white,
    },
    secondary: {
      light: lightYellow,
      main: mainYellow,
      dark: darkYellow,
      contrastText: white,
    },
    tertiary: {
      light: lightBlue,
      main: mainBlue,
      dark: darkBlue,
      contrastText: white,
    }
  },
  typography: {
    fontFamily: 'Rajdhani,sans-serif',
    h1: {
      color: 'white',
      lineHeight: '1'
    },
    h2: {
      color: 'white',
      lineHeight: '1'
    },
    h3: {
      color: 'white',
      lineHeight: '1'
    },
    h4: {
      color: 'white',
    },
    h5: {
      color: 'white',
    },
    subtitle1: {
      color: 'white',
    }
  },
}

export default themeConfig;