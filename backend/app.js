const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const apiRouter = require('./router/api')
const { request, response } = require('express')
const logRouter = require('./router/login')
logger.info('connecting to', config.PORT)
const userRouter = require('./router/user')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())


app.use('/api/', apiRouter)
app.use('/log/', logRouter)
app.use('/user', userRouter)
module.exports = app
