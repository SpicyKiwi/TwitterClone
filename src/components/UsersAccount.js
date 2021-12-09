import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import { Link, useParams, Redirect } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import LeftNav from './LeftNav'

export default function UsersAccount(props) {

    const {UserHandle} = useParams()

    const {
        setUserToken,
        setUsername,
        setIsLoggedIn,
        pfpname,
        BASE_URL,
        userToken,
        userhandle,
        username,
        onHomePage,
        setOnHomePage
    } = props



    const [tweets, setTweets] = useState([])
    const [comments, setComments] = useState([])
    const [likedTweets, setLikedTweets] = useState([])
    const [section, setSection] = useState('Tweets')
    const [UserName, setUserName] = useState('')
    const [UserPFPname, setUserPFPname] = useState('')

    

    useEffect(() => {
        setOnHomePage(false)
        setSection("Tweets")
        fetchUsersTweets()
        fetchUsersComments()
        fetchUsersLikedTweets()
        getUserByUserhandle()
    }, [UserHandle])

    if(UserHandle === userhandle) {
        return <Redirect to="/my-account" />
    }

    async function getUserByUserhandle() {
        try {

            const response = await fetch(`${BASE_URL}/users/${UserHandle}`)

            const data = await response.json()
            setUserName(data.username)
            setUserPFPname(data.PFPname)

            return data

        } catch (error) {
            console.error(error)
        }
    }

    async function fetchUsersTweets() {
        try {

            const response = await fetch(`${BASE_URL}/tweets/${UserHandle}`)

            const data = await response.json()
            setTweets(data)

            return data

        } catch (error) {
            console.error(error)
        }
    }

    async function fetchUsersComments() {
        try {

            const response = await fetch(`${BASE_URL}/comments/${UserHandle}`)

            const data = await response.json()
            setComments(data)

            return data

        } catch (error) {
            console.error(error)
        }
    }

    async function fetchUsersLikedTweets() {
        try {

            const response = await fetch(`${BASE_URL}/likes/${UserHandle}`)

            const data = await response.json()

            const tweetIds = data.map(likeData => likeData.tweetId)

            tweetIds.map(async tweetId => {
                const tweet = await getTweetByTweetId(tweetId)

                setLikedTweets(likedTweets => [...likedTweets, tweet])
            })

            return data

        } catch (error) {
            console.error(error)
        }
    }

    async function getTweetByTweetId(tweetId){

        try {

            const response = await fetch(`${BASE_URL}/tweets/${tweetId}/id`)

            const data = await response.json()

            return data

        } catch(error) {
            console.error(error)
        }

    }

    function renderTweet({id, userName, tweetAuthorHandle, tweetContent, createdAt, PFPname}) {

        const day = createdAt.slice(8, 10)
        const month = createdAt.slice(5, 7)
        const year = createdAt.slice(0, 4)
        const time = createdAt.slice(11, 16)

        return (
            <div key={`tweet ${id}`} >
                <Card style={{ border: "1px solid #bababa", margin: "0.5rem", display: "flex" }}>
                    <Card.Title>
                        <img src={`images/${PFPname}.jpg`} alt="Profile" style={{ marginLeft: "0.5rem", marginTop: "0.5rem", height: "3rem", width: "3rem", borderRadius: "3rem"}}/> 
                        <span style={{fontWeight: "bolder", marginLeft: "0.25rem"}}>{userName}</span>
                        <span style={{ marginLeft: "0.5rem", opacity: "50%" }}>@{tweetAuthorHandle}</span>  
                    </Card.Title>

                    <Card.Subtitle style={{marginLeft: "0.5rem"}}>posted {month}/{day}/{year} at {time} UTC</Card.Subtitle>

                    <Card.Text style={{margin: "1rem"}}>{tweetContent}</Card.Text>
                
                    <div style={{ marginBottom: "0.5rem", paddingBottom: "0rem", display: "flex", justifyContent: "center", height: "2rem"}}>
                        
                    </div>
                </Card>
            </div>
        )
    }

    function renderLikedTweet({id, userName, tweetAuthorHandle, tweetContent, createdAt, PFPname}) {

        const day = createdAt.slice(8, 10)
        const month = createdAt.slice(5, 7)
        const year = createdAt.slice(0, 4)
        const time = createdAt.slice(11, 16)

        return (
            <div key={`liked ${id}`} >
                <Card style={{ border: "1px solid #bababa", margin: "0.5rem", display: "flex" }}>
                    <Card.Title>
                        <Link to={`/${tweetAuthorHandle}`} style={{textDecoration: "none", color: "black"}} >
                        <img src={`images/${PFPname}.jpg`} alt="Profile" style={{ marginLeft: "0.5rem", marginTop: "0.5rem", height: "3rem", width: "3rem", borderRadius: "3rem"}}/> 
                        <span style={{fontWeight: "bolder", marginLeft: "0.25rem"}}>{userName}</span>
                        <span style={{ marginLeft: "0.5rem", opacity: "50%" }}>@{tweetAuthorHandle}</span>  
                        </Link>
                    </Card.Title>

                    <Card.Subtitle style={{marginLeft: "0.5rem"}}>posted {month}/{day}/{year} at {time} UTC</Card.Subtitle>

                    <Card.Text style={{margin: "1rem"}}>{tweetContent}</Card.Text>
                
                    <div style={{ marginBottom: "0.5rem", paddingBottom: "0rem", display: "flex", justifyContent: "center", height: "2rem"}}>

                    </div>
                </Card>
            </div>
        )
    }



    function renderComment({id, commentAuthorHandle, userName, tweetId, commentContent, createdAt}) {


        const day = createdAt.slice(8, 10)
        const month = createdAt.slice(5, 7)
        const year = createdAt.slice(0, 4)
        const time = createdAt.slice(11, 16)

        return (
            <div key={`comment${id}`}>
                
                <Card style={{ border: "1px solid #bababa", margin: "0.5rem", display: "flex" }}>
                    <Card.Body>
                        <Card.Title>{userhandle === commentAuthorHandle ? "I " : <>{userName} <span style={{opacity: "50%"}}>@{commentAuthorHandle}</span> <br /> </>}said:</Card.Title>
    
    
                        <Card.Text >{commentContent}</Card.Text>

                        <Card.Subtitle style={{opacity: "100%", fontSize: "0.75rem"}}>commented {month}/{day}/{year} at {time} UTC </Card.Subtitle>

                    </Card.Body>
                </Card>

            </div>
        )
    }

    return (
        <div className="homepage background" style={{ height: "100vh", overflow: "auto", backgroundColor: "#131313", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column"}}>

            <div className="homepage main-screen" style={{width: "78%", display: "grid", gridTemplateColumns: "1fr 15fr"}}>

                
                <div className="LeftSideNavigator">

                <LeftNav 
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

                </div>

                <div className="MiddleTweets">
                    <Card style={{ height: "100vh", overflow: "auto"}}>
                        <div style={{display: "flex", justifyContent: "space-evenly", borderBottom: "1px solid black"}}>
                            <img src={`images/${UserPFPname}.jpg`} alt="profile" style={{ height: "10rem", width: "10rem", borderRadius: "10rem"}}/>
                            <button disabled={true} style={{ backgroundColor: "transparent", border: "0"}}></button>
                        </div>
                        <div >
                            <h3 style={{marginLeft: "2rem"}}>{UserName} <span style={{opacity: "50%"}}>@{UserHandle}</span></h3>
                        </div>
                        <Nav fill variant="tabs" defaultActiveKey="link-1">
                            <Nav.Link eventKey="link-1" onClick={() => setSection("Tweets")}>Tweets</Nav.Link>
                            <Nav.Link eventKey="link-2" onClick={() => setSection("Comments")}>Comments</Nav.Link>
                            <Nav.Link eventKey="link-3" onClick={() => setSection("Likes")}>Likes</Nav.Link>
                        </Nav>
                        {section === "Tweets" ? 
                            tweets[0] ? <div>{[...tweets].reverse().map(tweet => renderTweet(tweet))}</div> 
                            :
                            <div style={{textAlign: "center", margin: "auto"}}><p>No Tweets</p></div>
                        : null}

                        {section === "Comments" ? 
                            comments[0] ? <div>{[...comments].reverse().map(comment => renderComment(comment))}</div> :
                            <div style={{textAlign: "center", margin: "auto"}}><p>No comments</p></div>
                        : null}

                        {section === "Likes" ? 
                            likedTweets[0] ? <div>{[...likedTweets].reverse().map(tweet => renderLikedTweet(tweet))}</div> :
                            <div style={{textAlign: "center", margin: "auto"}}><p>No liked tweets</p></div>
                        : null}

                    </Card>
                   
                </div>
                
            </div>
            


        </div>
    )
}
