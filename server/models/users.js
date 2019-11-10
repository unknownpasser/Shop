var mongoose = require('./db')
var Schema = mongoose.Schema

var Users = new Schema({
  username: String,
  password: String,
  name: String,
  token: String
}, { versionKey: false })

module.exports = mongoose.model('Users', Users, 'users')