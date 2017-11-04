var express = require('express')
var router = express.Router()
const User = require('./../models/user').User
const HttpError = require('./../error').HttpError
const ObjectID = require('mongodb').ObjectID

router.get('/:id', function(req, res, next) {
  let id

  try {
    id = new ObjectID(req.params.id)
  } catch (e) {
    return next(404)
  }

  User.findById(id, (err, user) => {
    if (!user) {
      return next(new HttpError(404, 'User not found'))
    }
    if (err) {
      return next(err)
    }
    res.json(user)
  })
})

module.exports = router
