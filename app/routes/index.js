const express = require('express')
const router = express.Router()
const User = require('./../models/user').User
const AuthError = require('./../models/user').AuthError
const HttpError = require('./../error').HttpError
const checkAuth = require('./../middleware/checkAuth')

router.get('/', function(req, res) {
  res.render('index')
})

router.get('/chat', checkAuth, (req, res) => res.render('chat'))

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

router.post('/logout', function(req, res, next) {
  const sid = req.session.id
  const io = req.app.get('io')

  req.session.destroy(err => {
    io.sockets.$emit('session:reload', sid)
    if (err) return next(next)
  })
})

module.exports = router
