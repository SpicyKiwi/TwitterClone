import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import FormControl from 'react-bootstrap/FormControl'
import './LeftNav.css'
import LeftNav from './LeftNav'
import SearchBox from './SearchBox'
import RenderComments from './RenderComments'


export default function Home(props) {

    const {
        BASE_URL,
        setUserToken,
        userToken,
        setIsLoggedIn,
        username,
        setUsername,
        pfpname,
        userhandle,
        onHomePage,
        setOnHomePage
    } = props

    const [tweets, setTweets] = useState([])
    const [likesData, setLikesData] = useState([])
    const [numberOfLikes, setNumberOfLikes] = useState([])
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState([])
    const [showNewComment, setShowNewComment] = useState(false)
    const [newComment, setNewComment] = useState('')
    const [tweetsUsername, setTweetsUsername] = useState('')
    const [commentTweetId, setCommentTweetId] = useState('')
    

    useEffect(() => {
        fetchAllTweets()
        fetchLikedTweets()
        fetchNumberOfLikes()
        fetchAllComments()
        setOnHomePage(true)
    }, [])

    async function fetchAllComments() {
        try {

            const response = await fetch(`${BASE_URL}/comments`)

            const data = await response.json()
            setComments(data)

            return data


        } catch (error) {
            console.error(error)
        }

    }

    async function fetchNumberOfLikes() {
        try {

            const response = await fetch(`${BASE_URL}/likes/`)

            const data = await response.json()
            setNumberOfLikes(data)
            
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
            console.error(error)
        }
    }

    async function fetchAllTweets() {
        try {

            const response = await fetch(`${BASE_URL}/tweets`)

            const data = await response.json()
            data.sort((tweet, nextTweet) => tweet.id - nextTweet.id)
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

            return deletedTweetData
            
        } catch (error) {
            console.error(error)
        }
    }

    function showNewCommentClicked() {
        if(showNewComment) {
            setShowNewComment(false)
            setCommentTweetId('')
            setTweetsUsername('')
            return setNewComment('')
        } 
        setShowNewComment(!showNewComment)
    }

    function renderTweet({id, userName, tweetAuthorHandle, tweetContent, createdAt, PFPname}) {
        let liked = false
        const likedTweetIds = likesData.map(obj => obj.tweetId)
        if(likedTweetIds.includes(id)) liked = true



        const commentsForTweet = comments.filter(comment => comment.tweetId === id)

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

        const likeArray = numberOfLikes.filter(like => like.tweetId === id)

        const likeCount = likeArray.length

        return (
            <div >
                <Card style={{ border: "1px solid #bababa", margin: "0.5rem", display: "flex" }}>
                    <Card.Title>
                        <Link to ={`/${tweetAuthorHandle}`} style={{textDecoration: "none", color: "black"}}>
                        <img src={`images/${PFPname}.jpg`} alt="Profile" style={{ marginLeft: "0.5rem", marginTop: "0.5rem", height: "3rem", width: "3rem", borderRadius: "3rem"}}/> 
                        <span style={{fontWeight: "bolder", marginLeft: "0.25rem"}}>{userName}</span>
                        <span style={{ marginLeft: "0.5rem", opacity: "50%" }}>@{tweetAuthorHandle}</span>  
                        </Link>
                    </Card.Title>

                    <Card.Subtitle style={{marginLeft: "0.5rem"}}>posted {month}/{day}/{year} at {time} UTC</Card.Subtitle>

                    <Card.Text style={{margin: "1rem"}}>{tweetContent}</Card.Text>
                
                    <div style={{ paddingBottom: "0rem", display: "flex", justifyContent: "space-between", height: "2rem"}}>

                        {commentsForTweet[0] ? 
                        
                        <button 
                        onClick={() => {
                            if(showComments.includes(id)) {
                                const index = showComments.indexOf(id)
                                showComments.splice(index, 1)
                                return setShowComments(showComments => [...showComments])
                            } else {
                                setShowComments(showComments => [...showComments, id])
                            }
                        }} 
                        style={{ marginLeft: "1rem", borderRadius: "1rem", backgroundColor: ""}}>{showComments.includes(id) ? "Hide Comments" : "View Comments"}</button>
                        :
                        <button style={{ marginLeft: "1rem", backgroundColor: "transparent", border: "0", color: "black" }} disabled={true} >No Comments</button>
                        }

                        <button style={{ borderRadius: "1rem"}} onClick={() => {
                            setTweetsUsername(userName)
                            setCommentTweetId(id)
                            showNewCommentClicked()
                        }} >Post Comment</button>


                        <button style={{ backgroundColor: "#b81414", color: "white", borderRadius: "1rem", border: "1px solid #131313" }} 
                        hidden={tweetAuthorHandle === userhandle ? false : true} onClick={async () => {
                            await deleteTweet(id)
                            await fetchAllTweets()
                        }}> DELETE </button>
                        
                        <button onClick={async() => liked ? await unlike() : await like()} 
                        style={{ marginLeft: "1rem", width: "5rem", backgroundColor: "transparent", border: "0" }} >
                            {liked ? <>{likeCount}<img src="images/like_heart.png" alt="like button" height="30rem" style={{backgroundColor: ""}}/> </>: <>{likeCount}<img src="images/unlike_heart.png" alt="like button" height="30rem" style={{backgroundColor: ""}}/> </>}
                        </button>

                    </div>

                    <hr />
                    
                    <div style={{marginBottom: "1rem", marginTop: "-1rem", width: "100%", paddingLeft: "2rem"}}>
                        {commentsForTweet.map(comment => <RenderComments 
                        comment={comment} 
                        tweetsId={id}
                        showComments={showComments}
                        setShowComments={setShowComments}
                        userhandle={userhandle}
                        fetchAllComments={fetchAllComments}
                        BASE_URL={BASE_URL}
                        userToken={userToken}
                        />)}
                    </div>
                </Card>
            </div>
        )
    }

    async function postComment() {
        try {
            const response = await fetch(`${BASE_URL}/comments/${commentTweetId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    userName: username,
                    authorHandle: userhandle,
                    commentContent: newComment
                })
            })

            const data = await response.json()

            return data

        } catch (error) {
            console.error(error)
        }
    }



    async function postTheComment() {
        await postComment()
        await fetchAllComments()
        setShowNewComment(false)
        setNewComment('')
    }

    

    return (
        <div className="homepage background" style={{ height: "100vh", overflow: "auto", position: "relative", backgroundColor: "#131313", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column"}}>

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
                onHomePage={onHomePage}
                setOnHomePage={setOnHomePage}
                />

                </div>

                <div className="MiddleTweets" style={{ height: "100vh", overflow: "auto", backgroundColor: "#ededed"}}>
                    <h1 style={{ margin: "0.5rem", textAlign: "center"}}>Top'a the mornin to ya {username}!</h1>

                    { showNewComment ? 
                    <Alert variant="light" style={{position: "fixed", zIndex: "1", left: "18%", top: "3rem", width: "40%", border: "1px solid black"}} onClose={() => {
                        setShowNewComment(false)
                        setNewComment('')
                        setCommentTweetId('')
                        setTweetsUsername('')
                        }} dismissible>

                        {newComment.length >= 265 ? <p style={{fontWeight: "bolder", margin: "0", padding: "0"}}>Your comment cannot exceed 280 characters! {newComment.length <= 280 ? <span>{newComment.length}/280</span> : <span style={{color: "red"}}>{newComment.length}/280</span> } </p> : <br />}
                        Your comment on {tweetsUsername}'s tweet: 
                        <FormControl 
                        as="textarea"
                        placeholder="what do you have to say?"
                        onChange={e => setNewComment(e.target.value)}
                        style={{maxHeight: "14rem"}}
                        />
                        <button onClick={async () => newComment.length > 0 ? await postTheComment() : null} style={{ marginTop: "1rem", borderRadius: "3rem", backgroundColor: "#0d6efd", border: "0", color: "white", padding: "0.25rem" }} disabled={newComment.length > 280 || newComment.length === 0}>Post Comment</button>
                    </Alert> 
                    : 
                    null }


                    {[...tweets].reverse().map(tweet => renderTweet(tweet))}
                   
                </div>

                <div className="RightSideSearchAndSuggestedAccounts">
                    <SearchBox 
                        BASE_URL={BASE_URL}
                    />
                </div>
                
            </div>
            


        </div>
    )
}