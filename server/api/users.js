require('dotenv').config()

const express = require('express')
const usersRouter = express.Router()
const jwt = require('jsonwebtoken')

const genericError = { error: "Something went wrong! Try again"}

usersRouter.use(express.json())

const {
    getAllUsers,
    createUser,
    verifyUser,
    editUsername,
    deleteUserByUserhandle,
    getUserByUserhandle,
    getUserByUsername,
    editPFPname
} = require('../db')

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users")
    next()
})

usersRouter.get("/", async (req, res, next) => {
    //get all users
    try {
        const users = await getAllUsers()
        res.send(users)
    } catch {
        res.status(500).send(genericError)
    }

})

usersRouter.post("/register", async (req, res, next) => {
    //creates a user
    const { username, userhandle, password, profilePic} = req.body
    const userObj = {username, userhandle, password, profilePic}
    try {

        if (password.length < 8) {
            return res.status(400).send({ error: "Password must be atleast 8 characters long."})
        }

        if (password.length > 250) {
            return res.status(400).send({ error: "Password is too long."})
        }

        if (userhandle.includes(' ')) {
            return res.status(400).send({ error: "Your user handle cannot contain spaces."})
        }

        const takenUsername = await getUserByUserhandle(userhandle)
        if(typeof(takenUsername) == 'object') {
            return res.status(400).send({ error: "This account handle is already taken, please choose a different one."})
        }


        const registeredUser = await createUser(userObj)

        const accessToken = jwt.sign(registeredUser, process.env.ACCESS_TOKEN_SECRET)

        delete registeredUser.password
        res.status(201).send({ message: "Account registration successful!", userInfo: registeredUser, token: accessToken })
        

    } catch {
        res.status(500).send(genericError)
    }
})

usersRouter.post("/login", async (req, res, next) => {
    //verifies and logs in user
    const { userhandle, password } = req.body

    try {

        const verifiedUser = await verifyUser(userhandle, password)
        if(!verifiedUser) {
            return res.status(400).send({ error: "Incorrect userhandle or password, please try again!"})
        }


        const accessToken = jwt.sign(verifiedUser, process.env.ACCESS_TOKEN_SECRET)

        delete verifiedUser.id
        res.send({ message: "You have logged in successfully!", userInfo: verifiedUser, token: accessToken})

    } catch {
        res.status(500).send(genericError)
    }
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

usersRouter.patch('/:userhandle', authenticateToken, async (req, res, next) => {
    //edit users username or profile picture
    const { userhandle } = req.params
    const { username, PFPname } = req.body

    try {

        const updatedUserInfo = {}
        
        const takenUsername = await getUserByUsername(username)
        if(takenUsername !== "no user") {
            return res.status(400).send({ error: "This username is already linked to an account, please choose a different one."})
        }

        if(username !== '') {
            const updatedUsername = await editUsername(userhandle, username)

            updatedUserInfo.updatedUsername = updatedUsername
        }

        if(PFPname !== '') {
            const updatedPFPname = await editPFPname(userhandle, PFPname)

            updatedUserInfo.updatedPFPname = updatedPFPname
        }
        
        res.send({ message: "You have successfully updated your account!", updatedUserInfo})

    } catch (error) {
        res.status(500).send(genericError)
    }

})

usersRouter.delete('/:userhandle', authenticateToken, async (req, res, next) => {
    //delete user by user handle
    const {userhandle} = req.params
    const {userhandleReq} = req.body
    try {

        if(userhandle !== userhandleReq) return res.status(401).send({ error: "You can only delete your own account!" })//

        const deletedUser = await deleteUserByUserhandle(userhandle)

        res.send({ message: "You have successfully deleted your account!", deletedUser})

    } catch {
        res.status(500).send({genericError, userhandle, userhandleReq})
    }

})

usersRouter.get("/:userhandle", async (req, res, next) => {
    //get user by user handle
    const {userhandle} = req.params
    try {

        const user = await getUserByUserhandle(userhandle)

        res.send(user)

    } catch {
        res.status(500).send(genericError)
    }
})

module.exports = {
    usersRouter,
    authenticateToken
}