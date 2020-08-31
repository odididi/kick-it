import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import {SocketContextProvider} from "./services/socket";

const Router = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <SocketContextProvider>
            <Route path="/chat" exact component={Chat}/>
            {/* <Route path="/chat/:channel" exact component={Chat}/> */}
          </SocketContextProvider>
          <Redirect to="/" />
        </Switch>
    </BrowserRouter>
  );
}

export default Router;
