import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Homepage from "./Homepage";
import LoginBox from "./LoginBox";

function App() {
  return (
    <Router>
        <div className="container">
            <img src="images/twitter_logo.png" className="App-logo" alt="logo" />

        <Switch>

            <Route exact path="/">
                <Homepage />
            </Route>
            <Route path="login">
                <LoginBox />
            </Route>

        </Switch>

        </div>
    </Router>
  );
}

export default App;