import React from 'react';
import Router from './routes';
import {ThemeProvider} from '@material-ui/core';
import {theme} from './styles/theme';
import {AuthContextProvider} from './services/auth';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default App;

