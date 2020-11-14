import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import {Home} from 'components/pages';
import {StreamContextProvider} from 'services/stream';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <StreamContextProvider>
          <Route path="/" exact component={Home} />
        </StreamContextProvider>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
