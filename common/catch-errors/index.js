const logger = require('../logger')

function catchErrors(exitOnUncaughtPromiseException = true) {
  // it is not safe to resume normal operation after 'uncaughtException'.
  // read more: https://nodejs.org/api/process.html#process_event_uncaughtexception
  process.on('uncaughtException', (err) => {
    logger.fatal(err, 'uncaught exception')
    process.exit(1)
  })

  // a Promise is rejected and no error handler is attached.
  // read more: https://nodejs.org/api/process.html#process_event_unhandledrejection
  process.on('unhandledRejection', (reason) => {
    logger.error(reason, 'unhandled promise rejection')
    if (exitOnUncaughtPromiseException) {
      process.exit(1)
    }
  })
}

module.exports = catchErrors
