var express = require('express');
var router = express.Router();
var Swipes = require('../models/swipes')
var Recommends = require('../models/recommends')
var Goods = require('../models/goods')
var NavBars = require('../models/navbars')
var AddressList = require("../models/addressLists")
var checkToken = require("../token/checkToken")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/swipes', (req, res, next) => {
  Swipes.find({}, (err, doc) => {
    res.json(doc)
  })
})

router.get('/recommends', (req, res, next) => {
  Recommends.find({}, { _id: 0, by: 0 }, (err, doc) => {
    res.json(doc)
  })
})

router.get('/goods', (req, res, next) => {
  Goods.find({}, { name: 1, imgurl: 1, price: 1, by: 1 }, (err, doc) => {
    res.json(doc)
  })
})

router.get('/navbars', (req, res, next) => {
  NavBars.find({}, {}, (err, doc) => {
    res.json(doc)
  })
})

router.get('/detail', (req, res, next) => {
  let gid = req.query.gid
  Goods.findOne({ _id: gid }, (err, doc) => {
    if (doc) {
      res.json(doc)
    } else {
      console.log(err)
    }
  })
})

router.get('/addresslist', (req, res, next) => {
  let authorization = req.get('Authorization');
  let tokenStatus = checkToken(authorization);
  if (tokenStatus.code == 0) {
    AddressList.find({ userId: tokenStatus.id }, (err, doc) => {
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
  } else {
    res.json({ code: "1", msg: "请登录" })
  }
})

router.get('/addressinfo', (req, res, next) => {
  let aid = req.query.aid
  let authorization = req.get('Authorization');
  let tokenStatus = checkToken(authorization);
  if (tokenStatus.code == 0) {
    AddressList.findOne({ _id: aid }, (err, doc) => {
      if (err) {
        res.json({ code: "1", msg: "错误" })
      } else {
        if (doc) {
          res.json({ code: "0", msg: doc })
        } else {
          res.json({ code: "1", msg: "错误" })
        }
      }
    })
  } else {
    res.json({ code: "1", msg: "错误" })
  }
})

router.post('/saveaddress', (req, res, next) => {
  let authorization = req.get('Authorization');
  let tokenStatus = checkToken(authorization);
  let content = req.body.content
  content.userId = tokenStatus.id
  if (content._id) {
    AddressList.updateOne({ _id: content._id }, { $set: content }, { upsert: true }, (err, doc) => {
      if (err) {
        console.log(err)
      } else {
        res.json(doc)
      }
    })
  } else {
    AddressList.insertMany([content], (err, doc) => {
      if (err) {
        console.log(err)
      } else {
        res.json(doc)
      }
    })
  }
})

router.post('/deleteaddress', (req, res, next) => {
  let aid = req.body.aid
  AddressList.remove({ _id: aid }, (err, doc) => {
    if (err) {
      console.log(err)
    } else {
      res.json(doc)
    }
  })
})

module.exports = router;
