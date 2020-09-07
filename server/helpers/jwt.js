const jwt = require('jsonwebtoken')

function generateToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET)
}

function validateToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generateToken, validateToken }
