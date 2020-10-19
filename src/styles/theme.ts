import {createMuiTheme} from '@material-ui/core/styles';

export const palette = {
  yellow: '#DECF17',
  black: '#0c1113',
}

const defaultTheme = createMuiTheme({
  typography: {
    fontFamily: [
      'NBook'
    ].join(',')
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1440,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: palette.yellow,    
    },
    secondary: {
      main: '#0c1113',
    },
  },
  overrides: {
    MuiTypography: {
      root: {
        color: palette.yellow
      }
    }
  }
});

const {breakpoints} = defaultTheme;

export const theme = {
  ...defaultTheme,
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: '32px',
        [breakpoints.up('sm')]: {
          fontSize: '42px'
        },
        [breakpoints.up('md')]: {
          fontSize: '60px'
        },
        [breakpoints.up('lg')]: {
          fontSize: '96px'
        }
      },
      h2: {
        fontSize: '24px',
        [breakpoints.up('sm')]: {
          fontSize: '32px'
        },
        [breakpoints.up('md')]: {
          fontSize: '40px'
        },
        [breakpoints.up('lg')]: {
          fontSize: '60px'
        }
      },
      h3: {
        fontSize: '18px',
        [breakpoints.up('sm')]: {
          fontSize: '24px'
        },
        [breakpoints.up('md')]: {
          fontSize: '28px'
        },
        [breakpoints.up('lg')]: {
          fontSize: '40px'
        }
      },
      h4: {
        fontSize: '16px',
        [breakpoints.up('sm')]: {
          fontSize: '20px'
        },
        [breakpoints.up('md')]: {
          fontSize: '24px'
        },
        [breakpoints.up('lg')]: {
          fontSize: '36px'
        }
      },
      h5: {
        fontSize: '14px',
        [breakpoints.up('sm')]: {
          fontSize: '18px'
        },
        [breakpoints.up('md')]: {
          fontSize: '24px'
        },
        [breakpoints.up('lg')]: {
          fontSize: '36px'
        }
      },
      h6: {
        fontSize: '13px',
        [breakpoints.up('sm')]: {
          fontSize: '16px'
        },
        [breakpoints.up('md')]: {
          fontSize: '20px'
        },
        [breakpoints.up('lg')]: {
          fontSize: '32px'
        }
      },
      body1: {
        fontSize: '12px',
        [breakpoints.up('sm')]: {
          fontSize: '14px'
        },
        [breakpoints.up('md')]: {
          fontSize: '16px'
        },
        [breakpoints.up('lg')]: {
          fontSize: '18px'
        }
      },
      body2: {
        fontSize: '11px',
        [breakpoints.up('sm')]: {
          fontSize: '13px'
        },
        [breakpoints.up('md')]: {
          fontSize: '15px'
        },
        [breakpoints.up('lg')]: {
          fontSize: '16px'
        }
      },

    }
  }
}