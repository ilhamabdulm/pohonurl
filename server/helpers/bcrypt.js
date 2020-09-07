const bcrypt = require('bcrypt')

function hashPassword(plain) {
  console.log(plain)
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(plain, salt)
}

function comparePass(plain, hash) {
  return bcrypt.compareSync(plain, hash)
}

module.exports = { hashPassword, comparePass }
