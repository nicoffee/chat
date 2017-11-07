const express = require('express')
const router = express.Router()
const User = require('models/user').User
const AuthError = require('models/user').AuthError
const HttpError = require('error').HttpError

router.get('/', function(req, res) {
  res.render('index.html')
})

router.post('/login', function(req, res, next) {
  const username = req.body.username
  const password = req.body.password

  User.authorize(username, password, function(err, user) {
    if (err) {
      if (err instanceof AuthError) {
        return next(new HttpError(403, err.message))
      } else {
        return next(err)
      }
    }

    req.session.user = user._id
    res.send({})
  })
})

module.exports = router
