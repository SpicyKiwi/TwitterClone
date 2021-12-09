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



async function editUsername(userhandle, username) {
    try {

        const { rows: [updatedUsername] } = await client.query(`

            UPDATE users
            SET username=$1
            WHERE userhandle=$2
            RETURNING *;

        `, [username, userhandle])  

        return updatedUsername
        
    } catch (error) {
        throw error
    }
}

async function editPFPname(userhandle, pfpname) {
    try {

        const { rows: [updatedPFP] } = await client.query(`
            UPDATE users
            SET "PFPname"=$1
            WHERE userhandle=$2
            RETURNING *;


        `, [pfpname, userhandle])

        await client.query(`
            UPDATE tweets
            SET "createdAt"="createdAt", "PFPname"=$1
            WHERE "tweetAuthorHandle"=$2
            RETURNING *;
        `, [pfpname, userhandle])

        return updatedPFP

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

async function getUserByUsername(username) {
    try {

        const { rows: [user] } = await client.query(`
            SELECT FROM users
            WHERE username=$1;
        `, [username])

        if (user) {
            return user
        }

        return "no user"

    } catch (error) {
        throw error
    }
}


module.exports = {
    createUser,
    editUsername,
    deleteUserByUserhandle,
    getUserByUserhandle,
    verifyUser,
    getAllUsers,
    getUserByUsername,
    editPFPname
}