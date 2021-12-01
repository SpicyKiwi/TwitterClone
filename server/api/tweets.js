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

tweetsRouter.post("/", (req, res, next) => {
    //create tweet
})

tweetsRouter.delete("/:tweetId", (req, res, next) => {
    //delete tweet by id
})

tweetsRouter.get("/", (req, res, next) => {
    //get all the tweets
})

tweetsRouter.get("/:userhandle", (req, res, next) => {
    //get all tweets by user's handle
})

tweetsRouter.get("/:userId/id", (req, res, next) => {
    //get tweet by tweetId
})

module.exports = {
    tweetsRouter
}