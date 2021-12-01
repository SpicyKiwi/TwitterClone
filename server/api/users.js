const express = require('express')
const usersRouter = express.Router()

const {
    getAllUsers,
    createUser,
    verifyUser,
    editUserInfo,
    deleteUserByUserhandle,
    getUserByUserhandle,
    getUserById
} = require('../db')

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users")
    next()
})

usersRouter.get("/", async (req, res, next) => {
    //get all users
})

usersRouter.post("/register", async (req, res, next) => {
    //creates a user
})

usersRouter.post("/login", async (req, res, next) => {
    //verify user
})

usersRouter.patch('/:userhandle', async (req, res, next) => {
    //edit user info
})

usersRouter.delete('/:userhandle', async (req, res, next) => {
    //delete user by user handle
})

usersRouter.get("/:userhandle", async (req, res, next) => {
    //get user by user handle
})

usersRouter.get("/:userId/id", async (req, res, next) => {
    //get user by id
})

module.exports = {
    usersRouter
}