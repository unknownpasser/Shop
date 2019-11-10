var mongoose = require('./db')
var Schema = mongoose.Schema

var Cart = new Schema({
  userId: String,
  goodsId: String,
  price: Number,
  num: Number,
  skuname: String,
  imgurl: String
}, { versionKey: false })

module.exports = mongoose.model("Cart", Cart, "cart")