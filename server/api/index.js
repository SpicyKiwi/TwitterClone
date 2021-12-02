const express = require('express')
const apiRouter = express.Router()


apiRouter.get('/', (req, res, next) => {
    const returnObj = { pulseCheck: "It's aliveeee!!"}

    res.send(returnObj)
})

const { usersRouter } = require('./users')
apiRouter.use('/users', usersRouter)

const { tweetsRouter } = require('./tweets')
apiRouter.use('/tweets', tweetsRouter)

const { commentsRouter } = require('./comments')
apiRouter.use('/comments', commentsRouter)

const { userlikesRouter } = require('./userlikes')
apiRouter.use('/likes', userlikesRouter)


apiRouter.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send(err)
})

module.exports = {
    apiRouter
}