const express = require("express")
const userlikesRouter = express.Router()

const genericError = { error: "Something went wrong! Try again"}


const {
    unlikeTweet,
    likeTweet,
    checkTweetLikes
} = require('../db')

userlikesRouter.use((req, res, next) => {
    console.log("A user is liking or unliking a tweet!")
    next()
})

userlikesRouter.get("/:tweetId", async (req, res, next) => {
    const tweetId = req.params
    try {
        
        const likesOnTheTweet = await checkTweetLikes({tweetId})

        res.send({ numberOfLikes: likesOnTheTweet})

    } catch {
        res.status(500).send(genericError)
    }
})

userlikesRouter.post("/:tweetId", async (req, res, next) => {
    const tweetId = req.params
    const userhandle = req.body
    try {

        const likedTweet = await likeTweet({userhandle, tweetId})

        res.status(201).send({ message: "You have liked a tweet", likedTweetData: likedTweet})

    } catch {
        res.status(500).send(genericError)
    }
})

userlikesRouter.delete("/:tweetId", async (req, res, next) => {
    const tweetId = req.params
    const userhandle = req.body
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