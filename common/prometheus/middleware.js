const onFinished = require('on-finished')
const Prometheus = require('./client')

const middleware = {
  recordResponseTime(req, res, next) {
    if (!res.locals) {
      res.locals = {}
    }

    res.locals.startEpoch = Date.now()

    onFinished(res, (err, res) => {
      const responseTimeInMs = Date.now() - res.locals.startEpoch

      Prometheus.httpRequestsTotal.inc({
        route: req.url,
        code: res.statusCode,
        method: req.method
      })
      Prometheus.httpRequestDurationMicroseconds.labels(req.url).observe(responseTimeInMs)
    })

    return next()
  },
}

module.exports = middleware
