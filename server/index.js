const db = require('../models/db')
const logger = require('../common/logger')
const gracefulShutdown = require('../common/graceful-shutdown')
const server = require('./server')
const config = require('./config')

server.listen(config.port).catch((err) => {
  logger.fatal('server error', err)
  process.exit(1)
})

// register graceful shutdown handler
gracefulShutdown([server.close.bind(server), db.disconnect.bind(db)])
