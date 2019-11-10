var mongoose = require('./db')
var Schema = mongoose.Schema

var AddressList = new Schema({
  id: String,
  address: String,
  name: String,
  tel: String,
  province: String,
  city: String,
  county: String,
  addressDetail: String,
  isDefault: Boolean,
  areaCode: String,
  userId: String
}, { versionKey: false })

module.exports = mongoose.model("AddressList", AddressList, "addressList")