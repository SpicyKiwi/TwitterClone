const client = require('./client')
const { getUserByUserhandle } = require('./users')

async function createComment(authorId, tweetId, commentContent) {
    try {

        const { rows: timestamp } = await client.query(`
            SELECT NOW();
        `)

        const { rows: comment } = await client.query(`
            INSERT INTO comments("commentAuthorId", "tweetId", "commentContent", "createdAt")
            VALUES($1, $2, $3, $4)
            RETURNING *
        `, [authorId, tweetId, commentContent, timestamp[0].now])

        return comment
        
    } catch (error) {
        throw error
    }
}

async function deleteCommentByCommentId(commentId) {
    try {

        const { rows: deletedComment } = await client.query(`
            DELETE FROM comments
            WHERE id=$1
        `, [commentId])

        return deletedComment
        
    } catch (error) {
        throw error
    }
}

async function getAllCommentsByTweetId(tweetId) {
    try {

        const { rows: tweetComments } = await client.query(`
            SELECT FROM comments
            WHERE "tweetId"=$1;
        `, [tweetId])

        return tweetComments
        
    } catch (error) {
        throw error
    }
}

async function getAllCommentsByUserhandle(userhandle) {
    try {

        const user = await getUserByUserhandle()

        const { rows: allComments } = await client.query(`
            SELECT FROM comments
            WHERE "commentAuthorId"=$1
        `, [user.id])

        return allComments
        
    } catch (error) {
        throw error
    }
}



module.exports = {
    createComment,
    deleteCommentByCommentId,
    getAllCommentsByTweetId,
    getAllCommentsByUserhandle
}