const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const apiRouter = require('./router/api')
const { request } = require('express')
const logRouter = require('./router/login')
logger.info('connecting to', config.PORT)


app.use(cors())
app.use(express.static('build'))
app.use(express.json())


app.use('/api/', apiRouter)
app.use('/log/', logRouter)
module.exports = app
