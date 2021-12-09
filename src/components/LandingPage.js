import React, { useState } from "react"
import Nav from 'react-bootstrap/Nav'
import LoginBox from "./LoginBox";
import SignUpBox from "./SignUpBox"


export default function LandingPage(props) {

    const {
        BASE_URL,
        setUserToken,
        setIsLoggedIn,
        setUsername,
        setpfpname,
        setUserhandle
    } = props
    const [haveAnAccount, setHaveAnAccount] = useState(true)


    return (

        <div style={{height: "100vmin", backgroundColor: "#131313", textAlign: "center", alignItems: "center", justifyContent: "center",  display: "flex", flexDirection: "column", color: "white"}}>
            
            <h1 style={{color: "#00acee"}}>Tweeter</h1>
            <h6 className="text-muted" style={{fontSize: "0.80rem"}}>Created by Farhan A</h6>

            <img src="images/twitter_logo.png" alt="logo" style={{height: "30vmin"}}/>

            <div>

            <Nav fill variant="tabs" defaultActiveKey="link-1">
                    <Nav.Link eventKey="link-1" onClick={() => setHaveAnAccount(true)}>Log In</Nav.Link>
                    <Nav.Link eventKey="link-2" onClick={() => setHaveAnAccount(false)}>Sign Up</Nav.Link>
            </Nav>

            {haveAnAccount ? 
            <LoginBox 
            BASE_URL={BASE_URL}
            setUserToken={setUserToken}
            setIsLoggedIn={setIsLoggedIn}
            setUsername={setUsername}
            setpfpname={setpfpname}
            setUserhandle={setUserhandle}
            
            /> : 
            <SignUpBox 
            BASE_URL={BASE_URL}
            setUserToken={setUserToken}
            setIsLoggedIn={setIsLoggedIn}
            setUsername={setUsername}
            setpfpname={setpfpname}
            setUserhandle={setUserhandle}
            />}
            

            </div>

        </div>
        
    )
}