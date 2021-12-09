const client = require('./client')

const { 
    getAllCommentsByTweetId,
    deleteCommentByCommentId 
} = require('./comments')

const {
    checkTweetLikes,
    removeLikeByLikeId
} = require('./userlikes')

async function createTweet({userName, authorHandle, tweetContent, PFPname}) {
    try {

        const { rows: [tweet] } = await client.query(`
            INSERT INTO tweets("userName", "tweetAuthorHandle", "tweetContent", "PFPname")
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `, [userName, authorHandle, tweetContent, PFPname])

        return tweet
        
    } catch (error) {
        throw error
    }
}

async function deleteTweetByTweetId(tweetId) {
    try {

        //Deletes all comments and likes on tweet
        const allComments = await getAllCommentsByTweetId(tweetId)

        const commentIds = allComments.map(comment => comment.id)
        const delComments = commentIds.map(async commentId => {
            const deletedComments = await deleteCommentByCommentId(commentId)

            return deletedComments
        })

        const deletedComments = await Promise.all(delComments)

        const allLikesOnTweet = await checkTweetLikes(tweetId)

        const likeIds = allLikesOnTweet.map(like => like.id)
        const deleteLikes = likeIds.map(async likeId => {
            const deletedLikes = await removeLikeByLikeId(likeId)

            return deletedLikes
        })

        const removedLikes = await Promise.all(deleteLikes)

        const { rows: [deletedTweet] } = await client.query(`
            DELETE FROM tweets
            WHERE id=$1
            RETURNING *;
        `, [tweetId])

        return {deletedTweet, deletedComments, removedLikes}
        
    } catch (error) {
        throw error
    }
}

async function getAllTweets() {
    try {

        const { rows: allTweets } = await client.query(`
            SELECT * FROM tweets;
        `)

        return allTweets
        
    } catch (error) {
        throw error
    }
}

async function getAllTweetsByUserhandle(userhandle) {
    try {

        const { rows: allTweetsByUser } = await client.query(`
            SELECT * FROM tweets
            WHERE "tweetAuthorHandle"=$1;
        `, [userhandle])

        return allTweetsByUser
        
    } catch (error) {
        throw error
    }
}

async function getTweetByTweetId(tweetId) {
    try {

        const { rows: [tweet] } = await client.query(`
            SELECT * FROM tweets
            WHERE id=$1;
        `, [tweetId])

        return tweet
        
    } catch (error) {
        throw error
    }
}



module.exports = {
    createTweet,
    deleteTweetByTweetId,
    getAllTweets,
    getAllTweetsByUserhandle,
    getTweetByTweetId
}