const Prometheus = require('./client')

module.exports = (req, res) => {
  res.header('Content-Type', Prometheus.register.contentType)
  res.send(Prometheus.register.metrics())
}
