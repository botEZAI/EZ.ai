import React from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components//Home";
import About from "./components/About";
import Guide from "./components/Guide";
import FAQ from "./components/FAQ";
import Login from "./components/Login";
import ChatbotList from "./components/ChatbotList/ChatbotList";
import Register from "./components/Register";
import ChatbotBuild from "./components/ChatbotBuild/ChatbotBuild";

const App = ({ location }) => {
  return (
    <div className="App">
      <Header />
      <section>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/about" component={About} />
          <Route path="/guide" component={Guide} />
          <Route path="/faq" component={FAQ} />
          <Route path="/chatbotlist" component={ChatbotList} />
          <Route path="/chatbotbuild" component={ChatbotBuild} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </section>
      <footer />
    </div>
  );
};

export default withRouter(App);
