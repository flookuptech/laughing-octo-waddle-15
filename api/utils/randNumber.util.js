const randomstring = require('randomstring')

exports.generateRandNumber = (length, charset) => {
  return randomstring.generate({
    length,
    charset
  })
}
