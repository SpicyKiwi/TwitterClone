const client = require('./client')
const bcrypt = require('bcrypt')

async function createUser(username, userhandle, password, profilePic) {

    if(!username || !userhandle || !password) {
        return
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 10)

        const { rows: user } = await client.query(`
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

async function editUserInfo(userhandle, fields) {
    try {

        const { rows: updatedUser } = await client.query(`

        `)
        
    } catch (error) {
        throw error
    }
}

async function deleteUserByUserhandle(userhandle) {
    try {

        const { rows: deletedUser } = client.query(`
            DELETE FROM users
            WHERE userhandle=$1;
        `,[userhandle])

        return deletedUser
        
    } catch (error) {
        throw error
    }
}

async function getUserByUserhandle(userhandle) {
    try {

        const { rows: user } = await client.query(`
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
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);

        if(passwordsMatch){
            delete user.password
            return user
        }else{
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