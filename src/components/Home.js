import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import './LeftNav.css'
import LeftNav from './LeftNav'

export default function Home(props) {

    const {
        BASE_URL,
        setUserToken,
        userToken,
        setIsLoggedIn,
        username,
        setUsername,
        pfpname,
        userhandle
    } = props

    const [tweets, setTweets] = useState([])
    const [likesData, setLikesData] = useState([])
    const likedTweetIds = likesData.map(obj => obj.tweetId)
    const [numberOfLikes, setNumberOfLikes] = useState([])
    

    useEffect(() => {
        fetchAllTweets()
        fetchLikedTweets()
        fetchNumberOfLikes()
    }, [])

    async function fetchNumberOfLikes() {
        try {

            const response = await fetch(`${BASE_URL}/likes/`)

            const data = await response.json()
            setNumberOfLikes(data)
            
            console.log("Data for number of likes: ", data)
            return data

        } catch (error) {
            console.error(error)
        }

    }

    async function fetchLikedTweets() {
        try {
            const response = await fetch(`${BASE_URL}/likes/${userhandle}`)

            const data = await response.json()
            setLikesData(data)

            return data

        } catch (error) {
            throw error
        }
    }

    async function fetchAllTweets() {
        try {

            const response = await fetch(`${BASE_URL}/tweets`)

            const data = await response.json()
            setTweets(data)

            return data

        } catch (error) {
            console.error(error)
        }
    }

    async function likeATweet(tweetId) {
        try {

            const response = await fetch(`${BASE_URL}/likes/${tweetId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    userhandle
                })
            })

            const data = await response.json()
            return data

        } catch (error) {
            console.error(error)
        }
    }

    async function unlikeATweet(tweetId) {
        try {

            const response = await fetch(`${BASE_URL}/likes/${tweetId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    userhandle
                })
            })

            const data = await response.json()
            return data

        } catch (error) {
            console.error(error)
        }
    }

    async function deleteTweet(id) {
        try {

            const response = await fetch(`${BASE_URL}/tweets/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    userhandle: userhandle
                })
            })

            const deletedTweetData = await response.json()
            console.log(deletedTweetData)

            return deletedTweetData
            
        } catch (error) {
            throw error
        }
    }///////////////////////////////////////////////////DELETE the likes when deleting a tweet or account

    function renderTweet({id, userName, tweetAuthorHandle, tweetContent, createdAt, PFPname}) {
        let liked = false
        if(likedTweetIds.includes(id)) liked = true

        const day = createdAt.slice(8, 10)
        const month = createdAt.slice(5, 7)
        const year = createdAt.slice(0, 4)
        const time = createdAt.slice(11, 16)

        async function like() {
            await likeATweet(id)
            await fetchLikedTweets()
            await fetchNumberOfLikes()
        }

        async function unlike() {
            await unlikeATweet(id)
            await fetchLikedTweets()
            await fetchNumberOfLikes()
        }

        console.log(numberOfLikes)
        const likeArray = numberOfLikes.filter(like => like.tweetId === id)

        const likeCount = likeArray.length

        return (
            <div key={id} >
                <Card style={{ border: "1px solid #bababa", margin: "0.5rem", display: "flex" }}>

                    <Card.Title>
                        <img src={`images/${PFPname}.jpg`} alt="Profile" style={{ marginLeft: "0.25rem", marginTop: "0.25rem", height: "3rem", width: "3rem", borderRadius: "3rem"}}/> 
                        <span style={{fontWeight: "bolder", marginLeft: "0.25rem"}}>{userName}</span>
                        <span style={{ marginLeft: "0.5rem", opacity: "0.5" }}>@{tweetAuthorHandle}</span>  
                        </Card.Title>

                    <Card.Subtitle style={{marginLeft: "0.25rem"}}>posted {month}/{day}/{year} at {time} UTC</Card.Subtitle>

                    <Card.Text style={{margin: "1rem"}}>{tweetContent}</Card.Text>
                
                    <div style={{ paddingBottom: "1rem", display: "flex", justifyContent: "space-between"}}>

                        <button style={{ marginLeft: "1rem", marginTop: "0.5rem", width: "4.25rem", padding: "0.125rem", backgroundColor: "#b81414", color: "white", borderRadius: "1rem", border: "1px solid #131313" }} 
                        hidden={tweetAuthorHandle === userhandle ? false : true} onClick={async () => {
                            await deleteTweet(id)
                            await fetchAllTweets()
                        }}> DELETE </button>
                        
                        <button onClick={async() => liked ? await unlike() : await like()} 
                        style={{ marginLeft: "1rem", width: "5rem", backgroundColor: "transparent", border: "0" }} >
                            {liked ? <>{likeCount}<img src="images/like_heart.png" alt="like button" height="30rem" style={{backgroundColor: ""}}/> </>: <>{likeCount}<img src="images/unlike_heart.png" alt="like button" height="30rem" style={{backgroundColor: ""}}/> </>}
                        </button>

                    

                    </div>

                </Card>

            </div>
        )

    }


    return (
        <div className="homepage background" style={{ position: "relative", backgroundColor: "#131313", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column"}}>

            <div className="homepage main-screen" style={{width: "78%", display: "grid", gridTemplateColumns: "2fr 19fr 11fr"}}>

                
                <div className="LeftSideNavigator">

                <LeftNav 
                setUserToken={setUserToken}
                userToken={userToken}
                setIsLoggedIn={setIsLoggedIn}
                setUsername={setUsername}
                userhandle={userhandle}
                pfpname={pfpname}
                BASE_URL={BASE_URL}
                fetchAllTweets={fetchAllTweets}
                username={username}
                />

                </div>

                <div className="MiddleTweets" style={{backgroundColor: "#ededed"}}>
                    <h1 style={{ margin: "0.5rem", textAlign: "center"}}>Top'a the mornin to ya {username}!</h1>

                    {[...tweets].reverse().map(tweet => renderTweet(tweet))}
                   
                </div>

                <div className="RightSideSearchAndSuggestedAccounts">
                    <Card>Search and suggestions</Card>
                </div>
                
            </div>
            


        </div>
    )
}