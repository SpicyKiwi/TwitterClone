const client = require('./client')

async function createComment({userName, authorHandle, tweetId, commentContent}) {
    try {

        const { rows: [comment] } = await client.query(`
            INSERT INTO comments("userName", "commentAuthorHandle", "tweetId", "commentContent")
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `, [userName, authorHandle, tweetId, commentContent])

        return comment
        
    } catch (error) {
        throw error
    }
}

async function deleteCommentByCommentId(commentId) {
    try {

        const { rows: [deletedComment] } = await client.query(`
            DELETE FROM comments
            WHERE id=$1
            RETURNING *;
        `, [commentId])

        return deletedComment
        
    } catch (error) {
        throw error
    }
}

async function getAllCommentsByTweetId(tweetId) {
    try {

        const { rows: tweetComments } = await client.query(`
            SELECT * FROM comments
            WHERE "tweetId"=$1;
        `, [tweetId])

        return tweetComments
        
    } catch (error) {
        throw error
    }
}

async function getAllCommentsByUserhandle(userhandle) {
    try {


        const { rows: allComments } = await client.query(`
            SELECT * FROM comments
            WHERE "commentAuthorHandle"=$1;
        `, [userhandle])

        return allComments
        
    } catch (error) {
        throw error
    }
}

async function getCommentByCommentId(commentId) {
    try {

        const { rows: [comment] } = await client.query(`
            SELECT * FROM comments
            WHERE id=$1;
        `, [commentId])

        return comment

    } catch (error) {
        throw error
    }
}

async function getAllComments() {
    try {

        const { rows: comments } = await client.query(`
            SELECT * FROM comments;
        `)  

        return comments

    } catch (error) {
        throw error
    }
}



module.exports = {
    createComment,
    deleteCommentByCommentId,
    getAllCommentsByTweetId,
    getAllCommentsByUserhandle,
    getCommentByCommentId,
    getAllComments
}