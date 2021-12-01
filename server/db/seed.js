const client = require('./client')

const {
    createUser,
    getAllUsers,
    getUserByUserhandle,
    createTweet,
    getAllTweets,
    getAllTweetsByUserhandle,
    getTweetByTweetId,
    createComment,
    getAllCommentsByTweetId,
    getAllCommentsByUserhandle
} = require('./')

async function dropTables() {
    try {
        console.log('Dropping all tables...')

        await client.query(`

        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS tweets;
        DROP TABLE IF EXISTS users;

        `)

        console.log('Finished dropping tables!')
    } catch (error) {
        console.error('Error while dropping tables!')
        console.error('The error: ', error)
        throw error
    }
}

async function createTables() {
    try {
        console.log('Starting to build tables...')

        await client.query(`
        
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            userhandle VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            "PFPname" VARCHAR(255)
        );

        CREATE TABLE tweets(
            id SERIAL PRIMARY KEY,
            "tweetAuthorId" INTEGER REFERENCES users(id),
            "tweetContent" VARCHAR(280) NOT NULL,
            "createdAt" TIMESTAMP NOT NULL
        );

        CREATE TABLE comments(
            id SERIAL PRIMARY KEY,
            "commentAuthorId" INTEGER REFERENCES users(id),
            "tweetId" INTEGER REFERENCES tweets(id),
            "commentContent" VARCHAR(280) NOT NULL,
            "createdAt" TIMESTAMP NOT NULL
        );

        `)
    } catch (error) {
        console.error('Error creating tables!')
        console.error('The error: ', error)
        throw error
    }
}

async function rebuildDB() {
    try {
        console.log("Starting to rebuild the DB...")

        await client.connect()
        await dropTables()
        await createTables()

        console.log("RebuildDB function was successful!")
    } catch (error) {
        console.error("Error during the DB rebuild!")
        console.error("The error: ", error)
        throw error
    }
}

rebuildDB()
    .catch(console.error)
    .finally(() => client.end())