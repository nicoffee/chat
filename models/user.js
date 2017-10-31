const crypto = require('crypto')

const mongoose = require('lib/mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  }
})

schema.methods.encryptPassword = password =>
  crypto.createHmac('sha1', this.salt).update()
