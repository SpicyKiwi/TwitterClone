const express = require('express')
const apiRouter = express.Router()

const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

apiRouter.get('/', (req, res, next) => {
    const returnObj = { pulseCheck: "It's aliveeee!!"}

    res.send(returnObj)
})

const { usersRouter } = require('./users')
apiRouter.use('/users', usersRouter)





apiRouter.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send(err)
})

module.exports = {
    apiRouter
}