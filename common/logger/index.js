const pino = require('pino')
const config = require('./config')

const logger = pino(config)

module.exports = Object.assign(logger, {
  interceptConsole() {
    console.log = (...args) => {
      logger.info(...args)
    }
  }
})
