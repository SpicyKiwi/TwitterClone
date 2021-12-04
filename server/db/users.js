const client = require('./client')
const bcrypt = require('bcrypt')

const {
    getAllTweetsByUserhandle,
    deleteTweetByTweetId
} = require('./tweets')

async function createUser({username, userhandle, password, profilePic}) {

    if(!username || !userhandle || !password) {
        return
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 10)

        const { rows: [user] } = await client.query(`
            INSERT INTO users(username, userhandle, password, "PFPname")
            VALUES($1, $2, $3, $4)
            ON CONFLICT(userhandle) DO NOTHING
            RETURNING *;
        `, [username, userhandle, hashedPassword, profilePic])

        return user
        
    } catch (error) {
        throw error
    }
}

function editUserFields(fields) {

    const insert = Object.keys(fields).map((key, idx) => {
        return `"${ key }"=$${ idx + 1 }`
    }).joing(', ')

    const select = Object.keys(fields).map(($, idx) => {
        return `$${ idx + 1 }`
    }).join(', ')

    const vals = Object.values(fields)
    return {insert, select, vals}

}

async function editUserInfo({userhandle, ...fields}) {
    try {

        const toUpdate = {}

        for (let column in fields) {
            if (fields[column] !== undefined) toUpdate[column] = fields[column]
        }

        let userInfo

        if (editUserFields(fields).insert.length > 0) {
            const { rows: updatedUser } = await client.query(`
                UPDATE users
                SET ${editUserFields(toUpdate).insert}
                WHERE userhandle=${userhandle}
                RETURNING *;
            `, Object.values(toUpdate))

            userInfo = updatedUser

            return userInfo

        }
        
    } catch (error) {
        throw error
    }
}

async function deleteUserByUserhandle(userhandle) {
    try {

        //Delete all tweets created by user
        const allTweets = await getAllTweetsByUserhandle(userhandle)

        const tweetIds = allTweets.map(tweet => tweet.id)
        const delTweets = tweetIds.map(async tweetId => {
            const deletedTweets = await deleteTweetByTweetId(tweetId)

            return deletedTweets
        })

        const deletedTweets = await Promise.all(delTweets)

        const { rows: [deletedUser] } = await client.query(`
            DELETE FROM users
            WHERE userhandle=$1
            RETURNING *;
        `,[userhandle])

        return {deletedUser, deletedTweets}
        
    } catch (error) {
        throw error
    }
}

async function getUserByUserhandle(userhandle) {
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

async function verifyUser(userhandle, password) {
    if(!userhandle || !password){
        return;
    }
    try {
        const user = await getUserByUserhandle(userhandle);
        if(!user) {
            return;
        }
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);

        if(passwordsMatch){
            delete user.password
            return user
        } else {
            return;
        }
    } catch (error) {
        throw error;
    }
}

async function getUserById(userId) {
    try {

        const { rows: user } = await client.query(`
            SELECT * FROM users
            WHERE id=$1;
        `, [userId])

        return user
        
    } catch (error) {
        throw error
    }
}

async function getAllUsers() {
    try {
        
        const { rows: users } = await client.query(`
            SELECT * FROM users;
        `)

        return users

    } catch (error) {
        throw error
    }
}



module.exports = {
    createUser,
    editUserInfo,
    deleteUserByUserhandle,
    getUserByUserhandle,
    verifyUser,
    getUserById,
    getAllUsers
}