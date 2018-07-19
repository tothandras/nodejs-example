const fastify = require('fastify')
const routes = require('./routes')

const server = fastify()

server.post('/users', routes.users.post.schema, routes.users.post)
server.get('/users', routes.users.get.schema, routes.users.get)
server.get('/users/:id', routes.users.get.schema, routes.users.get)

module.exports = server
