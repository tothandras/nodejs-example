const logger = require('../logger')

function createHandler(checks = []) {
  // respond with '503 Service Unavailable' once the termination signal is received
  let shuttingDown = false
  process.once('SIGTERM', () => {
    shuttingDown = true
  })

  return async function check(req, res) {
    if (shuttingDown) {
      return res.status(503).send('service is shutting down')
    }

    for (const check of checks) {
      try {
        await check()
      } catch (err) {
        logger.error(err, 'health check failed')
        return res.status(500).send()
      }
    }

    res.status(200).send()
  }
}

module.exports = createHandler
