const client = require('./client')

async function createComment({authorHandle, tweetId, commentContent}) {
    try {

        const { rows: [comment] } = await client.query(`
            INSERT INTO comments("commentAuthorHandle", "tweetId", "commentContent")
            VALUES($1, $2, $3)
            RETURNING *;
        `, [authorHandle, tweetId, commentContent])

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

async function _getUserByUserhandle(userhandle) {
    //This is to avoid circular dependency
    try {

        const { rows: [user] } = await client.query(`
            SELECT * FROM users
            WHERE userhandle=$1;
        `, [userhandle])

        return user
        
    } catch (error) {
        throw error
    }
}

async function getAllCommentsByUserhandle(userhandle) {
    try {

        const user = await _getUserByUserhandle(userhandle)

        const { rows: allComments } = await client.query(`
            SELECT FROM comments
            WHERE "commentAuthorId"=$1;
        `, [user.id])

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



module.exports = {
    createComment,
    deleteCommentByCommentId,
    getAllCommentsByTweetId,
    getAllCommentsByUserhandle,
    getCommentByCommentId
}