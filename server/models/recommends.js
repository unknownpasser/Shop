var mongoose = require('./db')
var Schema = mongoose.Schema

var Recommends = new Schema({
  title: String,
  content:Array
})

module.exports = mongoose.model('Recommends', Recommends, 'recommends')