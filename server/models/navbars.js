var mongoose = require('./db')
var Schema = mongoose.Schema

var NavBars = new Schema({
  imgurl: String,
  wtitle: String
})

module.exports = mongoose.model('NavBars', NavBars, 'wrappers')