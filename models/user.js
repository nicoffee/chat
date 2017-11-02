const crypto = require('crypto')
const mongoose = require('./../libs/mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  created: {
    type: String,
    unique: true,
    required: true
  }
})

schema.methods.encryptPassword = password =>
  crypto
    .createHmac('sha1', this.salt)
    .update(password)
    .digest('hex')

schema
  .virtual('password')
  .set(password => {
    schema._plainPassword = password
    schema.salt = Math.random() + ''
    schema.hashedPassword = schema.methods.encryptPassword(password)
  })
  .get(() => this._plainPassword)

schema.methods.checkPassword = password =>
  this.encryptPassword(password) === this.hashedPassword

exports.User = mongoose.model('User', schema)
