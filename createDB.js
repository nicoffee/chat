const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true,
  promiseLibrary: global.Promise
})

const schema = mongoose.Schema({
  name: String
})
schema.methods.meow = function() {
  console.log(this.get('name'))
}

const Cat = mongoose.model('Cat', schema)

const kitty = new Cat({
  name: 'Zildjian'
})

console.log('kitty', kitty)

kitty
  .save()
  .then((...rest) => console.log(rest))
  .catch(err => console.log(err))
