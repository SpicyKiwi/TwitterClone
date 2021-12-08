const client = require('./client')

async function likeTweet({userhandle, tweetId}) {

    try {
        console.log("userhandle: ", userhandle)
        console.log("tweetId: ", tweetId)
        const { rows: [likedTweet] } = await client.query(`
            INSERT INTO userlikes(userhandle, "tweetId")
            VALUES($1, $2)
            RETURNING *;
        `, [userhandle, tweetId])
        console.log("liked tweet: ", likedTweet)

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

async function checkTweetLikes(tweetId) {

    try {

        const { rows: likesOnTweet } = await client.query(`
            SELECT * FROM userlikes
            WHERE "tweetId"=$1;
        `, [tweetId])

        return likesOnTweet

    } catch (error) {
        throw error
    }

}

async function getLikedTweetsByUserhandle(userhandle) {

    try {

        const { rows: likedTweets } = await client.query(`
            SELECT * FROM userlikes
            WHERE userhandle=$1;
        `, [userhandle])

        return likedTweets

    } catch (error) {
        throw error
    }

}

async function getAllLikesForTweets() {

    try {

        const { rows: likesOnTweets } = await client.query(`
            SELECT * FROM userlikes;
        `) 

        return likesOnTweets

    } catch (error) {
        throw error
    }
    
}

async function removeLikeByLikeId(likeId) {

    try {

        const { rows: removedLikes } = await client.query(`
            DELETE FROM userlikes
            WHERE id=$1
            RETURNING *;
        `, [likeId])  

        return removedLikes

    } catch (error) {
        throw error
    }

}

module.exports = {
    likeTweet,
    unlikeTweet,
    checkTweetLikes,
    getLikedTweetsByUserhandle,
    getAllLikesForTweets,
    removeLikeByLikeId
}