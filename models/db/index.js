const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.uri, {
  user: config.username,
  pass: config.password,
  promiseLibrary: global.Promise,
  bufferCommands: false
}).then((conn) => {
  console.log('connected to MongoDB')
}).catch((err) => {
  console.error(err, 'failed to connect to MongoDB')
  process.exit(1)
})

module.exports = mongoose
