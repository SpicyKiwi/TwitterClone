const express = require('express')
const commentsRouter = express.Router()

const genericError = { error: "Something went wrong! Try again"}


const {
    authenticateToken
} = require('./users')

const {
    createComment,
    deleteCommentByCommentId,
    getAllCommentsByUserhandle,
    getAllCommentsByTweetId,
    getCommentByCommentId
} = require("../db")

commentsRouter.use((req, res, next) => {
    console.log("A request is being made to /comments")
    next()
})

commentsRouter.post("/:tweetId", authenticateToken, async (req, res, next) => {
    //create a comment on a tweet
    const {tweetId} = req.params
    const {authorHandle, commentContent} = req.body
    try {

        const createdComment = await createComment({authorHandle, tweetId, commentContent})

        res.status(201).send({ message: "You have created a comment on a tweet!", commentData: createdComment})

    } catch {
        res.status(500).send(genericError)
    }
})

commentsRouter.delete("/:commentId", authenticateToken, async (req, res, next) => {
    //delete comment by comment Id
    const {commentId} = req.params
    const {userhandle} = req.body
    try {

        const comment = await getCommentByCommentId(commentId)

        

        //const deletedComment = await deleteCommentByCommentId(commentId)

        res.status(202).send({ message: "You have successfully deleted a comment!", comment: comment})

    } catch {
        res.status(500).send(genericError)
    }
})

commentsRouter.get("/:userhandle", async (req, res, next) => {
    //get all comments by user handle
    const {userhandle} = req.params
    try {

        const allCommentsByUser = await getAllCommentsByUserhandle(userhandle)

        res.send(allCommentsByUser)

    } catch {
        res.status(500).send(genericError)
    }
})

commentsRouter.get("/:tweetId/id", async (req, res, next) => {
    //get all comments by tweet Id
    const {tweetId} = req.params
    try {

        const allCommentsByTweet = await getAllCommentsByTweetId(tweetId)

        res.send(allCommentsByTweet)

    } catch {
        res.status(500).send(genericError)
    }
})

module.exports = {
    commentsRouter
}