const User = require('models/user').User;

const user = new User({
  name: 'Zildjian'
})

  if (err) throw err

  User.findOne({ username: 'Tester' }, (err, tester) => console.log(tester))
})
