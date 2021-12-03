const express = require('express')
const tweetsRouter = express.Router()

const genericError = { error: "Something went wrong! Try again"}

const {
    authenticateToken
} = require('./users')

const {
    createTweet,
    deleteTweetByTweetId,
    getAllTweets,
    getAllTweetsByUserhandle,
    getTweetByTweetId
} = require('../db')

tweetsRouter.use((req, res, next) => {
    console.log("A request is being made to /tweets")
    next()
})

tweetsRouter.get("/", async (req, res, next) => {
    //get all the tweets
    try {

        const allTweets = await getAllTweets()

        res.send(allTweets)

    } catch {
        res.status(500).send(genericError)
    }
})

tweetsRouter.post("/", authenticateToken, async (req, res, next) => {
    //create tweet{ authorHandle, tweetContent }
    const {authorHandle, tweetContent} = req.body

    try {

        const newTweet = await createTweet({authorHandle, tweetContent})

        res.status(201).send({ yourTweetSir: newTweet})

    } catch (error) {
        res.status(500).send({genericError})

    }
})

tweetsRouter.delete("/:tweetId", authenticateToken, async (req, res, next) => {
    //delete tweet by id
    const {tweetId} = req.params
    const {userhandle} = req.body
    try {

        const tweet = await getTweetByTweetId(tweetId)

        if(tweet.tweetAuthorHandle !== userhandle) {
            return res.status(405).send({ error: "You cannot delete someone else's tweet... lol"})
        }

        const deletedTweet = await deleteTweetByTweetId(tweetId)

        res.status(202).send(deletedTweet)

    } catch {
        res.send(genericError)
    }
})

tweetsRouter.get("/:userhandle", async (req, res, next) => {
    //get all tweets by user's handle
    const {userhandle} = req.params
    try {
        
        const usersTweets = await getAllTweetsByUserhandle(userhandle)

        res.send(usersTweets)

    } catch {
        res.status(500).send(genericError)
    }
})

tweetsRouter.get("/:tweetId/id", async (req, res, next) => {
    //get tweet by tweetId
    const {tweetId} = req.params
    try {

        const tweet = await getTweetByTweetId(tweetId)

        res.send(tweet)

    } catch {
        res.status(500).send(genericError)
    }
})

module.exports = {
    tweetsRouter
}