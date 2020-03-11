import React from "react";
import LedList from "./common/ledlist/LedList";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Details from "./common/detail/Details";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/leds" exact>
          <LedList />
        </Route>
        <Route path="/leds/:index">
          <Details/>
        </Route>
        <Route path="/">
          <Redirect to="/leds" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
