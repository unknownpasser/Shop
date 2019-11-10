var express = require('express');
var router = express.Router();
var Users = require('../models/users')
var createToken = require('../token/createToken')
var checkToken = require('../token/checkToken')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 登录验证
router.post('/logincheck', (req, res, next) => {
  let iusername = req.body.username
  let ipassword = req.body.password
  Users.findOne({ username: iusername, password: ipassword }, (err, doc) => {
    if (err) {
      res.json({ code: "1", msg: { title: "连接错误" } })
    } else {
      // 把token存入数据库(弃用)
      // if (doc) {
      //   let token = createToken(doc._id)
      //   Users.findOneAndUpdate({ _id: doc._id }, { token: token }, { new: true }, (err, dec) => {
      //     res.json({ code: "0", msg: dec })
      //   })
      // } else {
      //   res.json({ code: "1", msg: { title: "账号或密码错误" } })
      // }
      if (doc) {
        let token = createToken(doc._id)
        res.json({ code: "0", msg: { token: token } })
      } else {
        res.json({ code: "1", msg: { title: "账号或密码错误" } })
      }
    }
  })
});

// 注册
router.post('/logon', (req, res, next) => {
  let iusername = req.body.username
  let ipassword = req.body.password
  let iname = req.body.name
  Users.findOne({ username: iusername }, (err, doc) => {
    if (err) {
      res.json({ code: "1", msg: { title: "连接错误" } })
    } else {
      if (doc) {
        res.json({ code: "1", msg: { title: "账号已存在" } })
      } else {
        Users.insertMany([{ name: iname, username: iusername, password: ipassword }], (err, doc) => {
          if (err) {
            res.json({ code: "1" })
          } else {
            res.json({ code: "0", msg: true })
          }
        })
      }
    }
  })
});



// 个人主页调用
router.post('/userhome', (req, res, next) => {
  let authorization = req.get('Authorization');
  let tokenStatus = checkToken(authorization);
  if (tokenStatus.code == 0) {
    Users.findOne({ _id: tokenStatus.id }, { _id: 0, name: 1, by: 1 }, (err, doc) => {
      if (err) {
        res.json({ code: "1", msg: { title: "连接错误" } })
      } else {
        if (doc) {
          res.json({
            code: "0",
            msg: doc
          })
        } else {
          res.json({ code: "1", msg: { title: "查找不到" } })
        }
      }
    })
  } else {
    res.json({ code: "1", msg: { title: "过期" } })
  }
})

module.exports = router;
