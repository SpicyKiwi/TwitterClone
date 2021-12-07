import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import LandingPage from "./LandingPage";
import Home from "./Home"
import Settings from "./Settings";
import MyAccount from "./MyAccount";

function App() {

    const BASE_URL = 'http://localhost:3000/api'
    const [userToken, setUserToken] = useState(localStorage.getItem("userToken"))
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"))
    const [username, setUsername] = useState(localStorage.getItem("username"))
    const [pfpname, setpfpname] = useState(localStorage.getItem("pfpname"))
    const [userhandle, setUserhandle] = useState(localStorage.getItem("userhandle"))

    //twitter's color is #00acee

  return (
    <Router>
        <div className="main page" style={{backgroundColor: "#131313"}}>
            {/* <img src="images/twitter_logo.png" className="App-logo" alt="logo" /> */}

        <Switch>

            <Route exact path="/">
                {userToken ? 
                <Redirect to="/home" />
                :
                <LandingPage 
                BASE_URL={BASE_URL}
                setUserToken={setUserToken}
                setIsLoggedIn={setIsLoggedIn}
                setUsername={setUsername}
                setpfpname={setpfpname}
                setUserhandle={setUserhandle}
                />
                }

            </Route>

            <Route path="/home">
                {userToken ? 
                <Home 
                BASE_URL={BASE_URL}
                userToken={userToken}
                isLoggedIn={isLoggedIn}
                setUserToken={setUserToken}
                setIsLoggedIn={setIsLoggedIn}
                username={username}
                setUsername={setUsername}
                pfpname={pfpname}
                userhandle={userhandle}
                />
                :
                <Redirect to="/" />
                }

            </Route>

            <Route path="/settings">
                <Settings 
                    BASE_URL={BASE_URL}
                    userToken={userToken}
                    isLoggedIn={isLoggedIn}
                    setUserToken={setUserToken}
                    setIsLoggedIn={setIsLoggedIn}
                />
            </Route>

            <Route path="/my-account">
                <MyAccount 
                    BASE_URL={BASE_URL}
                />
            </Route>


        </Switch>

        </div>
    </Router>
  );
}

export default App;