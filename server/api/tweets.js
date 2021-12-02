const express = require('express')
const tweetsRouter = express.Router()

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

tweetsRouter.post("/", async (req, res, next) => {
    //create tweet{ authorHandle, tweetContent }
    const {authorHandle, tweetContent} = req.body
    const tweetObj = {authorHandle, tweetContent}

    try {

        const newTweet = await createTweet(tweetObj)

        res.send({ yourTweetSir: newTweet})

    } catch {

    }
})

tweetsRouter.delete("/:tweetId", async (req, res, next) => {
    //delete tweet by id
})

tweetsRouter.get("/", async (req, res, next) => {
    //get all the tweets
})

tweetsRouter.get("/:userhandle", async (req, res, next) => {
    //get all tweets by user's handle
})

tweetsRouter.get("/:userId/id", async (req, res, next) => {
    //get tweet by tweetId
})

module.exports = {
    tweetsRouter
}