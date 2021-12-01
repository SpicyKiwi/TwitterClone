const express = require('express')
const apiRouter = express.Router()

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

// const { usersRouter } = require('./users')
// apiRouter.use('/users', usersRouter)

apiRouter.use(function (err, req, res, next) {
    res.send(err)
})

apiRouter.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send(err)
})

module.exports = apiRouter