const crypto = require('crypto')
const mongoose = require('./../libs/mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  username: {
    type: String,
    unique: false,
    required: true
  },
  hashedPassword: {
    type: String,
    required: false
  },
  salt: {
    type: String,
    required: false
  },
  created: {
    type: String,
    unique: true,
    required: false
  }
})

schema
  .virtual('password')
  .set(password => {
    this.password = password
  })
  .get(() => this.password)

exports.User = mongoose.model('User', schema)
