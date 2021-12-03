import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import LandingPage from "./LandingPage";
import Home from "./Home"

function App() {

    //twitter's color is #00acee

  return (
    <Router>
        <div className="main page" >
            {/* <img src="images/twitter_logo.png" className="App-logo" alt="logo" /> */}

        <Switch>

            <Route exact path="/">
                <LandingPage />
            </Route>

            <Route path="/home">
                <Home />
            </Route>


        </Switch>

        </div>
    </Router>
  );
}

export default App;