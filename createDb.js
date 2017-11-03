const User = require('./models/user').User

const user = new User({
  username: 'Tester',
  password: 'secret'
})

user
  .save()
  .then((...rest) => console.log(rest))
  .catch(err => console.log('error', err))
