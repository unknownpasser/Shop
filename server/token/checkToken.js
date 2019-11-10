var jwt = require("jsonwebtoken")
var Users = require("../models/users")

module.exports = function (authorization) {
  let status = jwt.verify(authorization, "passerby", (error, doc) => {
    if (error) {
      return { code: 1 }
    } else {
      // let dbstatus
      // Users.findOne({ _id: doc.userId, token: authorization }, (err, dec) => {
      //   if (err) {
      //     return { code: 1 }
      //   } else {
      //     if (dec) {
      //        return { code: 0, id: doc.userId }
      //     } else {
      //       return { code: 1 }
      //     }
      //   }
      // })
      // return dbstatus
      return { code: 0, id: doc.userId }
    }
  })
  return status;
}