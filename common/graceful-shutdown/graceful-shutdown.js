const logger = require('../logger')

function registerGracefulShutdown(closeHandlers = [], timeout = 30) {

  // gracefully shutdown on SIGTERM or SIGINT signal
  process.once('SIGTERM', gracefulShutDown.bind(this, 'SIGTERM'))
  process.once('SIGINT', gracefulShutDown.bind(this, 'SIGINT'))

  async function gracefulShutDown(signal = 'SIGTERM') {
    logger.info(`got kill signal (${signal}), starting graceful shut down`)

    // shut down anyway after 30s
    if (timeout) {
      setTimeout(() => {
        logger.error('could not finish in time, forcefully exiting')
        process.exit(1)
      }, timeout * 1000).unref()
    }

    // release resources
    let isError = false
    for (const handler of closeHandlers) {
      try {
        await handler()
      } catch (err) {
        logger.error(err, 'error happened during graceful shut down')
        isError = true
      }
    }

    if (isError) {
      process.exit(1)
    }

    logger.info('graceful shut down finished')
    process.kill(process.pid, signal)
  }
}

module.exports = registerGracefulShutdown
