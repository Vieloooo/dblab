const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const apiRouter = require('./api')
logger.info('connecting to', config.PORT)


app.use(cors())
app.use(express.static('build'))
app.use(express.json())


app.use('/api/', apiRouter)

module.exports = app
