const client = require('./client')

const { 
    getAllCommentsByTweetId,
    deleteCommentByCommentId 
} = require('./comments')

async function createTweet({userName, authorHandle, tweetContent, PFPname}) {
    try {

        const { rows: [tweet] } = await client.query(`
            INSERT INTO tweets("userName", "tweetAuthorHandle", "tweetContent", "PFPname")
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `, [userName, authorHandle, tweetContent, PFPname])

        console.log("username: ", userName, "authorhandle: ", authorHandle, "tweetContent: ", tweetContent, "pfpname: ", PFPname)

        return tweet
        
    } catch (error) {
        throw error
    }
}

async function deleteTweetByTweetId(tweetId) {
    try {

        //Deletes all comments on tweet
        const allComments = await getAllCommentsByTweetId(tweetId)

        const commentIds = allComments.map(comment => comment.id)
        const delComments = commentIds.map(async commentId => {
            const deletedComments = await deleteCommentByCommentId(commentId)

            return deletedComments
        })

        const deletedComments = await Promise.all(delComments)

        const { rows: [deletedTweet] } = await client.query(`
            DELETE FROM tweets
            WHERE id=$1
            RETURNING *;
        `, [tweetId])

        console.log("Tweet Id entered", tweetId)

        console.log("deleted tweet: ", deletedTweet)

        return {deletedTweet, deletedComments}
        
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

        console.log(tweet)

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