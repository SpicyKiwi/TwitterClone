import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import LandingPage from "./LandingPage";
import Home from "./Home"
import Settings from "./Settings";
import MyAccount from "./MyAccount";
import UsersAccount from "./UsersAccount";

function App() {

    const BASE_URL = 'https://tweeter-by-farhan.herokuapp.com/api'
    const [userToken, setUserToken] = useState(localStorage.getItem("userToken"))
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"))
    const [username, setUsername] = useState(localStorage.getItem("username"))
    const [pfpname, setpfpname] = useState(localStorage.getItem("pfpname"))
    const [userhandle, setUserhandle] = useState(localStorage.getItem("userhandle"))
    const [onHomePage, setOnHomePage] = useState(false)

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
                    onHomePage={onHomePage}
                    setOnHomePage={setOnHomePage}
                />
                :
                <Redirect to="/" />
                }

            </Route>


            <Route path="/settings">
                {userToken ? 
                <Settings 
                    setUserToken={setUserToken}
                    setIsLoggedIn={setIsLoggedIn}
                    pfpname={pfpname}
                    BASE_URL={BASE_URL}
                    userToken={userToken}
                    userhandle={userhandle}
                    username={username}
                    onHomePage={onHomePage}
                    setOnHomePage={setOnHomePage}
                    setpfpname={setpfpname}
                    setUsername={setUsername}
                />
                :
                <Redirect to="/" />
                }
            </Route>

            <Route path="/my-account">
                {userToken ?
                <MyAccount 
                    setUserToken={setUserToken}
                    setUsername={setUsername}
                    setIsLoggedIn={setIsLoggedIn}
                    pfpname={pfpname}
                    BASE_URL={BASE_URL}
                    userToken={userToken}
                    userhandle={userhandle}
                    username={username}
                    onHomePage={onHomePage}
                    setOnHomePage={setOnHomePage}
                />
                :
                <Redirect to="/" />
                }
            </Route>

            <Route path="/:UserHandle">
                {userToken ?
                <UsersAccount
                    setUserToken={setUserToken}
                    setUsername={setUsername}
                    setIsLoggedIn={setIsLoggedIn}
                    pfpname={pfpname}
                    BASE_URL={BASE_URL}
                    userToken={userToken}
                    userhandle={userhandle}
                    username={username}
                    onHomePage={onHomePage}
                    setOnHomePage={setOnHomePage}
                />
                :
                <Redirect to="/" />
                }
            </Route>


        </Switch>

        </div>
    </Router>
  );
}

export default App;