const express = require('express')
const commentsRouter = express.Router()

const {
    createComment,
    deleteCommentByCommentId,
    getAllCommentsByUserhandle,
    getAllCommentsByTweetId
} = require("../db")

commentsRouter.use((req, res, next) => {
    console.log("A request is being made to /comments")
    next()
})

commentsRouter.post("/", async (req, res, next) => {
    //create a comment on a tweet
})

commentsRouter.delete("/:commentId", async (req, res, next) => {
    //delete comment by comment Id
})

commentsRouter.get("/:userhandle", async (req, res, next) => {
    //get all comments by user handle
})

commentsRouter.get("/tweetId/id", async (req, res, next) => {
    //get all comments by tweet Id
})

module.exports = {
    commentsRouter
}