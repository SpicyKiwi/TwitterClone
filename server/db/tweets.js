const client = require('./client')

async function createTweet(authorId, tweetContent) {
    try {

        const { rows: timestamp } = await client.query(`
            SELECT NOW();
        `)

        const { rows: tweet } = await client.query(`
            INSERT INTO tweets("tweetAuthorId", "tweetContent", "createdAt")
            VALUES($1, $2, $3)
            RETURNING *;
        `, [authorId, tweetContent, timestamp[0].now])

        return tweet
        
    } catch (error) {
        throw error
    }
}

async function deleteTweetByTweetId(tweetId) {
    try {

        const { rows: deletedTweet } = await client.query(`
            DELETE FROM tweets
            WHERE id=$1
            RETURNING *;
        `, [tweetId])

        return deletedTweet
        
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
            WHERE userhandle=$1;
        `, [userhandle])

        return allTweetsByUser
        
    } catch (error) {
        throw error
    }
}

async function getTweetByTweetId(tweetId) {
    try {

        const { rows: tweet } = await client.query(`
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