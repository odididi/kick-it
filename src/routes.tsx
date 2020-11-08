import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import {Home} from 'components/pages';
import {ChatContextProvider} from 'services/chat';
import {StreamContextProvider} from 'services/stream';
import {Channel} from 'components/organisms';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ChatContextProvider>
          <StreamContextProvider>
            <Route path="/" exact component={Home} />
          </StreamContextProvider>
        </ChatContextProvider>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
