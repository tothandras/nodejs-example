const server = require('./server')
const config = require('./config')

server.listen(config.port).catch((err) => {
  console.error('server error', err)
  process.exit(1)
})
