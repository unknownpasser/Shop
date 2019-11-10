var jwt = require("jsonwebtoken")

module.exports = function (userid) {
  const token = jwt.sign({ userId: userid }, "passerby", { expiresIn: '7d' })
  return token
}