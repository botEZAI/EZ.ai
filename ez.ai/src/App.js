import React from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import About from "./components/About";
import Guide from "./components/Guide";
import FAQ from "./components/FAQ";
import Login from "./components/Login";

const App = ({ location }) => {
  return (
    <div className="App">
      {location.pathname !== "/login" && <Header />}
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/about" component={About} />
        <Route path="/guide" component={Guide} />
        <Route path="/faq" component={FAQ} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
