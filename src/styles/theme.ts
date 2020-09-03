import {createMuiTheme} from '@material-ui/core/styles';

export const palette = {
  yellow: '#ffed00',
  black: '#0c1113',
}

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#ffed00',    
    },
    secondary: {
      main: '#0c1113',
    },
  },
  overrides: {
    MuiTypography: {
      root: {
        color: '#ffed00'
      }
    }
  }
});