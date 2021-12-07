const client = require('./client')

const {
    createUser,
    createTweet,
    createComment,
    likeTweet
} = require('./')

async function dropTables() {
    try {
        console.log('Dropping all tables...')

        await client.query(`

        DROP TABLE IF EXISTS userlikes;
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
            username VARCHAR(255) UNIQUE NOT NULL,
            userhandle VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            "PFPname" VARCHAR(255) NOT NULL
        );

        CREATE TABLE tweets(
            id SERIAL PRIMARY KEY,
            "userName" VARCHAR(255) REFERENCES users(username),
            "tweetAuthorHandle" VARCHAR(255) REFERENCES users(userhandle),
            "tweetContent" VARCHAR(280) NOT NULL,
            "PFPname" VARCHAR(255) NOT NULL,
            "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE comments(
            id SERIAL PRIMARY KEY,
            "commentAuthorHandle" VARCHAR(255) REFERENCES users(userhandle),
            "tweetId" INTEGER REFERENCES tweets(id),
            "commentContent" VARCHAR(280) NOT NULL,
            "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE userlikes(
            id SERIAL PRIMARY KEY,
            userhandle VARCHAR(255) REFERENCES users(userhandle),
            "tweetId" INTEGER REFERENCES tweets(id),
            "likedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        `)
    } catch (error) {
        console.error('Error creating tables!')
        console.error('The error: ', error)
        throw error
    }
}

async function createInitialUsers() {
    console.log("starting to create users...")
    try {

        const usersToCreate = [
            {username: "Frosty", userhandle: "frostythesnowman", password: "123password", profilePic: "redPFP"},
            {username: "Gerald", userhandle: "mcboingboing", password: "123123123", profilePic: "defaultPFP"},
            {username: "Neo", userhandle: "the_one", password: "passpasspass", profilePic: "greenPFP"}
        ]

        const users = await Promise.all(usersToCreate.map(createUser))

        console.log("Users Created: ")
        console.log(users)
        console.log("Finished creating the users!")
    } catch (error) {
        console.error("Error while creating users!")
        console.error("The error: ", error)
        throw error
    }
}

async function createInitialTweets() {
    console.log("Tweeters are tweeting their tweets...")
    try {

        const tweetsToCreate = [
            {userName: "Frosty", authorHandle: "frostythesnowman", tweetContent: "This is my first tweet!!! Excited to build this app and see what it looks like at the end!", PFPname: "redPFP"},
            {userName: "Frosty", authorHandle: "frostythesnowman", tweetContent: "Hello World!", PFPname: "redPFP"},
            {userName: "Frosty", authorHandle: "frostythesnowman", tweetContent: "Third and final tweet... gotta log off to go eat some grapes :)", PFPname: "redPFP"},
            {userName: "Gerald", authorHandle: "mcboingboing", tweetContent: "Mi Hoy Mi Noy!", PFPname: "defaultPFP"},
            {userName: "Gerald", authorHandle: "mcboingboing", tweetContent: "beep boop boop beep bop", PFPname: "defaultPFP"},
            {userName: "Neo", authorHandle: "the_one", tweetContent: "Red pill... or blue pill... which do you choose? *dramatic music intensifies*", PFPname: "greenPFP"}
        ]

        const tweets = await Promise.all(tweetsToCreate.map(createTweet))

        console.log("tweets created: ")
        console.log(tweets)
        console.log("Finished creating tweets!")
    } catch (error) {
        console.error("Error while creating tweets!")
        console.error("The Error: ", error)
        throw error
    }
}

async function createInitialComments() {
    console.log("Commenters are commenting!")
    try {

        const commentsToCreate = [
            {authorHandle: "frostythesnowman", tweetId: 1, commentContent: "Don't forget to follow me guys!"},
            {authorHandle: "mcboingboing", tweetId: 1, commentContent: "But that feature isn't available yet..."},
            {authorHandle: "frostythesnowman", tweetId: 1, commentContent: "uhhhhhh........ darn nvm then"},
            {authorHandle: "frostythesnowman", tweetId: 4, commentContent: "Spongebob?"},
            {authorHandle: "the_one", tweetId: 2, commentContent: "quiet... agent smith might hear you!"},
            {authorHandle: "frostythesnowman", tweetId: 6, commentContent: "Why not both? "}
        ]

        const comments = await Promise.all(commentsToCreate.map(createComment))

        console.log("Comments created: ")
        console.log(comments)
        console.log("Finished creating comments!")
    } catch (error) {
        console.error("Error while creating comments!")
        console.error("The error: ", error)
        throw error
    }
}

async function createInitialLikesOnTweet() {
    console.log("Liking the tweets...")
    try {
        const tweetsToLike = [
            {userhandle: "mcboingboing", tweetId: 1},
            {userhandle: "mcboingboing", tweetId: 2},
            {userhandle: "the_one", tweetId: 2},
            {userhandle: "frostythesnowman", tweetId: 4},
            {userhandle: "frostythesnowman", tweetId: 5},
            {userhandle: "frostythesnowman", tweetId: 6}
        ]

        const userlikes = await Promise.all(tweetsToLike.map(likeTweet))

        console.log("Tweets have been liked!")
        console.log(userlikes)
        console.log("Finished liking tweets!")

    } catch (error) {
        console.error("Error trying to like a tweet!")
        console.error("The error: ", error)
        throw error
    }
}

async function rebuildDB() {
    try {
        console.log("Starting to rebuild the DB...")

        await client.connect()
        await dropTables()
        await createTables()
        await createInitialUsers()
        await createInitialTweets()
        await createInitialComments()
        await createInitialLikesOnTweet()

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