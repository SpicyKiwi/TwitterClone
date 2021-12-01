const client = require('./client')

// const {
//     // db adapter functions
// } = require('./')

async function dropTables() {
    try {
        console.log('Dropping all tables...')

        await client.query(`

        DROP TABLE IF EXISTS tweet_comments;
        DROP TABLE IF EXISTS user_tweets;
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
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            "userHandle" VARCHAR(255) NOT NULL,
            "profilePictureUrl" VARCHAR(255)
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
            "commentContent" VARCHAR(280) NOT NULL
        );

        CREATE TABLE user_tweets(
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
            "tweetId" INTEGER REFERENCES tweets(id)
        );

        CREATE TABLE tweet_comments(
            id SERIAL PRIMARY KEY,
            "tweetId" INTEGER REFERENCES tweets(id),
            "commentId" INTEGER REFERENCES comments(id)
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