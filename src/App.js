import React from 'react';
import './App.css';
import Router from './routes';
import {ThemeProvider} from '@material-ui/core';
import {theme} from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  )
}


export default App;
