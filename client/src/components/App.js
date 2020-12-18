import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import NotFount from "./NotFount";
const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Signin} />
        <Route component={NotFount} />
      </Switch>
    </main>
  </BrowserRouter>
);

export default App;
