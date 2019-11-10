var mongoose = require('./db')
var Schema = mongoose.Schema

var Swipes = new Schema({
  sid: String,
  imgurl: String
})

module.exports = mongoose.model('Swipes', Swipes, 'swipes')