const mongoose = require('./../lib/mongoose')

const Schema = mongoose.Schema

const schema = new Schema({
  username: {
    type: String,
    unique: false,
    required: true
  }
})

schema
  .virtual('password')
  .set(password => {
    this.password = password
  })
  .get(() => this.password)

exports.User = mongoose.model('User', schema)
