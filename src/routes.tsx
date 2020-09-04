import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import {Home, Chat} from 'components/pages';
import {ChatContextProvider} from 'services/chat';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <ChatContextProvider>
          <Route path="/chat" exact component={Chat} />
        </ChatContextProvider>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
