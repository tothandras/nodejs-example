const mongoose = require('mongoose')

//db.createUser({user:"test",pwd:"test123",roles:[{role:"dbOwner",db:"nodejs-example"}]});
const options = {
  user : process.env.MONGODB_USERNAME || "",
  pass : process.env.MONGODB_PASSWORD || ""
};

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/nodejs-example', options)
mongoose.Promise = global.Promise

const db = mongoose.connection

db.on('error', err => console.error('Connection error', err))
db.on('open', () => console.log('Connected to db'))

module.exports = db
