import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./components/pages/Home";
import Chat from "./components/pages/Chat";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/chat" exact component={Chat} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
