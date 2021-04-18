import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import User2Profile from "./pages/User2Profile";
import PastEvents from "./pages/PastEvents";
import Stats from "./pages/Stats";
import './App.css';
import * as ReactBootStrap from "react-bootstrap";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home}>
            <Home />
          </Route>
          <Route exact path={["/searchresult"]}>
            <SearchResults />
          </Route>
          <Route exact path={["/pastevents"]}>
            <PastEvents />
          </Route>
          <Route exact path={["/login"]}>
            <UserLogin />
          </Route>
          <Route exact path={["/signup"]}>
            <UserSignup />
          </Route>
          <Route exact path={["/user"]}>
            <User2Profile />
          </Route>
          <Route exact path={["/pastevents"]}>
            <PastEvents />
          </Route>
          <Route exact path={["/stats"]}>
            <Stats />
          </Route>
          {/* <Route exact path="/events/:id">
                    </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
