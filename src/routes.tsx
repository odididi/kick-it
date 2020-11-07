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

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <ChatContextProvider>
          <StreamContextProvider>
            <Route path="/chat" exact component={Chat} />
          </StreamContextProvider>
        </ChatContextProvider> */}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
