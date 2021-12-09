import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/Alert'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

export default function LeftNav(props) {

    const {
        setUserToken,
        setUsername,
        setIsLoggedIn,
        pfpname,
        BASE_URL,
        userToken,
        userhandle,
        fetchAllTweets,
        username,
        onHomePage,
        setOnHomePage
    } = props

    const [showLogout, setShowLogout] = useState(false)
    const [showNewTweet, setShowNewTweet] = useState(false)
    const [tweet, setTweet] = useState('')
    


    function profilePicClicked() {
        setShowLogout(!showLogout)
    }

    function logOut() {

        setUserToken('')
        setUsername('')
        setIsLoggedIn(false)
        setOnHomePage(false)
        localStorage.clear()
    }

    function renderLogOutBtn() {

        return (
            <div style={{ position: "fixed", bottom: "13.5rem", marginRight: "-5rem", zIndex: "1" }}>
                <Alert variant="light" onClose={() => setShowLogout(false)} dismissible style={{ border: "1px solid black" }}>
                    <Link to="/my-account" style={{textDecoration: "none", color: "#000000"}}>My Account</Link>
                    <hr />
                    <button onClick={logOut} style={{ border: "0", backgroundColor: "#f8d7da", padding: "0.25rem"}}><Image src="images/log_out_icon.png" height="30rem"/>Log Out</button>
                </Alert>
            </div>

        )
    }

    function newTweetClicked() {
        if (showNewTweet) {
            setShowNewTweet(false)
            return setTweet('')
        }
        setShowNewTweet(!showNewTweet)
    }

    async function postTweet() {
        try {

            const response = await fetch(`${BASE_URL}/tweets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    userName: username,
                    authorHandle: userhandle,
                    tweetContent: tweet,
                    PFPname: pfpname
                })
            })

            const data = await response.json()

            return data

        } catch (error) {
            console.error(error)
        }
    }

    function renderNewTweet() {

        async function post() {
            await postTweet()
            onHomePage && await fetchAllTweets()
            setShowNewTweet(false)
            setTweet('')
        }
        
        return (
            <div style={{ position: "fixed", left: "18%", top: "13rem", zIndex: "1", width: "40%"}}>

                <Alert variant="light" style={{border: "1px solid black", position: "relative"}} onClose={() => {
                    setShowNewTweet(false)
                    setTweet('')
                }} dismissible>
                    {tweet.length >= 265 ? <p style={{fontWeight: "bolder", margin: "0", padding: "0"}}>Your tweet cannot exceed 280 characters! {tweet.length <= 280 ? <span>{tweet.length}/280</span> : <span style={{color: "red"}}>{tweet.length}/280</span> } </p> : <br />}
                    <hr />
                    <InputGroup>
                        <Image src={`images/${pfpname}.jpg`} style={{ height: "3.7rem", width: "3.7rem", borderRadius: "3rem"}}/>
                        <FormControl as="textarea" placeholder="Whats on your mind?" onChange={e => setTweet(e.target.value)} style={{ marginLeft: "1rem", maxHeight: "14rem"}}/>
                    </InputGroup>
                    <hr />
                    <Button onClick={async () => tweet.length > 0 ? await post() : null} style={{ borderRadius: "3rem" }} disabled={tweet.length > 280 || tweet.length === 0}>Post Tweet</Button>
                        
                </Alert>

            </div>
        )
    }


    return (
        <>
            <div className="navigate-bootonz" style={{ position: "fixed", top: "3rem", backgroundColor: "white", width: "3.7rem", height: "3.7rem", textAlign: "center", borderRadius: "3rem", alignItems: "center", justifyContent: "center", display: "flex" }}>
                
                <Link to="/home"><Image alt="home" src="images/home_icon.png" height="60rem" /> </Link>
            </div>

            <div className="navigate-bootonz" style={{ position: "fixed", top: "8rem", backgroundColor: "white", width: "3.7rem", height: "3.7rem", textAlign: "center", borderRadius: "3rem", alignItems: "center", justifyContent: "center", display: "flex" }}>
                <Link to="/settings"><Image alt="settings" src="images/settings_icon.png" height="60rem" /></Link>
            </div>

            <div className="navigate-bootonz" style={{ position: "fixed", top: "13rem", backgroundColor: "white", width: "3.7rem", height: "3.7rem", textAlign: "center", borderRadius: "3rem", alignItems: "center", justifyContent: "center", display: "flex" }}>
                <Image onClick={newTweetClicked} alt="newTweet" src="images/new_tweet_icon.png" height="60rem" />
            </div>
            {showNewTweet && renderNewTweet()}

            {showLogout && renderLogOutBtn()}

            <div className="navigate-bootonz" style={{ position: "fixed", bottom: "10rem", backgroundColor: "white", width: "3.7rem", height: "3.7rem", textAlign: "center", borderRadius: "3rem", alignItems: "center", justifyContent: "center", display: "flex" }}>
                <Image onClick={profilePicClicked} alt="profilePicture" src={`images/${pfpname}.jpg`} style={{ height: "3.7rem", width: "3.7rem", borderRadius: "3rem"}}/>
            </div>
        </>
    )
}
