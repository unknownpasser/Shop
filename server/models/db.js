var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/oneshop', { useNewUrlParser: true })
var mconn = mongoose.connection
mconn.on('connected', () => {
  console.log('数据库连接成功')
})

mconn.on('error', () => {
  console.log('数据库连接失败')
})

mconn.on('dis', () => {
  console.log('数据库断开连接')
})

module.exports = mongoose