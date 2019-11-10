var express = require('express');
var router = express.Router();
var Cart = require('../models/cart')
var checkToken = require('../token/checkToken')

router.get('/list', (req, res, next) => {
  let authorization = req.get('Authorization');
  let tokenStatus = checkToken(authorization);
  Cart.find({ userId: tokenStatus.id }, (err, doc) => {
    if (err) {
      res.json({ code: "1", msg: "请登录" })
    } else {
      if (doc) {
        res.json({ code: "0", msg: doc })
      } else {
        res.json({ code: "1", msg: "请登录" })
      }
    }
  })
})

router.post('/add', (req, res, next) => {
  let authorization = req.get('Authorization');
  let tokenStatus = checkToken(authorization);
  let skuData = req.body.skuData
  if (tokenStatus.code == 0) {
    skuData.userId = tokenStatus.id
    Cart.findOne({ goodsId: skuData.goodsId, userId: skuData.userId }, (err, doc) => {
      if (doc) {
        Cart.updateOne({ goodsId: skuData.goodsId, userId: skuData.userId }, { $inc: { num: skuData.num } }, { upsert: true }, (err, doc) => {
          if (err) {
            res.json({ code: "1" })
          } else {
            res.json({ code: "0" })
          }
        })
      } else {
        Cart.insertMany([skuData], (err, doc) => {
          if (err) {
            res.json({ code: "1" })
          } else {
            res.json({ code: "0", msg: true })
          }
        })
      }
    })
  } else {
    res.json({ code: "1", msg: "请登录" })
  }
})

router.post('/delete', (req, res, next) => {
  let authorization = req.get('Authorization');
  let tokenStatus = checkToken(authorization);
  let goodsIdList = req.body.goodsIdlist
  if (tokenStatus.code == 0) {
    Cart.remove({ goodsId: { $in: goodsIdList }, userId: tokenStatus.id }, (err, doc) => {
      if (doc) {
        res.json({ code: "0", msg: doc })
      } else {
        res.json({ code: "1", msg: "错误" })
      }
    })
  } else {
    res.json({ code: "1", msg: "请登录" })
  }
})

module.exports = router