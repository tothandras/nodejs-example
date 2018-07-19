const fastify = require('fastify')
const prometheus = require('../common/prometheus')
const healthCheck = require('../common/health-check')
const db = require('../models/db')
const routes = require('./routes')

const server = fastify()

// record & expose metrics
server.use(prometheus.middleware.recordResponseTime)
server.get('/metrics', prometheus.handler)

// health-check endpoint
server.get('/health', healthCheck([async () => {
  if (db.connection.readyState !== 1 && db.connection.readyState !== 2) {
    throw new Error(`DB is not ready (state: ${db.connection.readyState}`)
  }
}]))

server.post('/users', routes.users.post.schema, routes.users.post)
server.get('/users', routes.users.get.schema, routes.users.get)
server.get('/users/:id', routes.users.get.schema, routes.users.get)

module.exports = server
