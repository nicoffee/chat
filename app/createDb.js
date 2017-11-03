const mongoose = require('./libs/mongoose')
const async = require('async')

mongoose.set('debug', true)

const open = cb => mongoose.connection.on('open', cb)

const dropDatabase = cb => {
  const db = mongoose.connection.db
  db.dropDatabase(cb)
}

const requireModels = cb => {
  require('./models/user')

  async.each(
    Object.keys(mongoose.models),
    (modelName, cb) => mongoose.models[modelName].ensureIndexes(cb),
    cb
  )
}

const createUsers = cb => {
  const users = [
    { username: 'Tester', password: '1236223' },
    { username: 'Dev', password: '6231666' },
    { username: 'CEO', password: '125235' }
  ]

  async.each(
    users,
    (userData, cb) => {
      const user = new mongoose.models.User(userData)
      user.save(cb)
    },
    cb
  )
}

async.series([open, dropDatabase, requireModels, createUsers], err => {
  console.log(err)
  mongoose.disconnect()
  process.exit(err ? 255 : 0)
})
