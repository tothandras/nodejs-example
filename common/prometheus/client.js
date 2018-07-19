const Prometheus = require('prom-client')

const collectionInterval = Prometheus.collectDefaultMetrics()
const httpRequestsTotal = new Prometheus.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['route', 'code', 'method']
})
const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['route']
})

module.exports = Object.assign(Prometheus, {
  collectionInterval,
  httpRequestsTotal,
  httpRequestDurationMicroseconds
})
