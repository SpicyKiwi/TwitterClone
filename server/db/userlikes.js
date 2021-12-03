const client = require('./client')

async function likeTweet({userhandle, tweetId}) {

    try {

        const { rows: [likedTweet] } = await client.query(`
            INSERT INTO userlikes(userhandle, "tweetId")
            VALUES($1, $2)
            RETURNING *;
        `, [userhandle, tweetId])

        return likedTweet
        
    } catch (error) {
        throw error
    }

}

async function unlikeTweet({userhandle, tweetId}) {

    try {

        const { rows: [unlikedTweet] } = await client.query(`
            DELETE FROM userlikes
            WHERE userhandle=$1 AND
                  "tweetId"=$2;
        `, [userhandle, tweetId])

        return unlikedTweet
        
    } catch (error) {
        throw error
    }

}

async function checkTweetLikes({tweetId}) {

    try {

        const { rows: [likesOnTweet] } = await client.query(`
            SELECT * FROM userlikes
            WHERE "tweetId"=$1;
        `, [tweetId])

        return likesOnTweet

    } catch (error) {
        throw error
    }

}

module.exports = {
    likeTweet,
    unlikeTweet,
    checkTweetLikes
}