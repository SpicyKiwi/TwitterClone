const express = require("express")
const userlikesRouter = express.Router()

const genericError = { error: "Something went wrong! Try again"}

const {
    authenticateToken
} = require('./users')

const {
    unlikeTweet,
    likeTweet,
    checkTweetLikes,
    getLikedTweetsByUserhandle,
    getAllLikesForTweets
} = require('../db')

userlikesRouter.use((req, res, next) => {
    console.log("A request has been made to /users!")
    next()
})

userlikesRouter.get("/", async (req, res, next) => {
    try {

        const allLikesOnTweets = await getAllLikesForTweets()

        res.send(allLikesOnTweets)

    } catch {
        res.status(500).send(genericError)
    }
})

userlikesRouter.get("/:tweetId/tweet", async (req, res, next) => {
    const {tweetId} = req.params
    try {
        
        const likesOnTheTweet = await checkTweetLikes({tweetId})

        res.send(likesOnTheTweet)

    } catch {
        res.status(500).send(genericError)
    }
})

userlikesRouter.get("/:userhandle", async (req, res, next) => {
    const {userhandle} = req.params
    try {

        const likedTweets = await getLikedTweetsByUserhandle(userhandle)
        
        res.send(likedTweets)

    } catch {
        res.status(500).send(genericError)
    }
})

userlikesRouter.post("/:tweetId", authenticateToken, async (req, res, next) => {
    const {tweetId} = req.params
    const {userhandle} = req.body
    try {

        const likedTweet = await likeTweet({userhandle, tweetId})

        res.status(201).send({ message: "You have liked a tweet", likedTweetData: likedTweet})

    } catch {
        res.status(500).send(genericError)
    }
})

userlikesRouter.delete("/:tweetId", authenticateToken, async (req, res, next) => {
    const {tweetId} = req.params
    const {userhandle} = req.body
    try{

        const unlikedTweet = await unlikeTweet({userhandle, tweetId})

        res.status(202).send({ message: "You have unliked a tweet", unlikedTweetData: unlikedTweet})

    } catch {
        res.status(500).send(genericError)
    }
})

module.exports = {
    userlikesRouter
}