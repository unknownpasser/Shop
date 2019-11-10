var mongoose = require('./db')
var Schema = mongoose.Schema

var Goods = new Schema({
  cid: Number,
  name: String,
  imgurl: String,
  price: Number,
  imagePreview:Array,
  skuname:String,
  skutype:String
})

module.exports = mongoose.model('Goods', Goods, 'goods')