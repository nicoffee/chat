const express = require('express')
const router = express.Router()

router.get('login', function(req, res) {
  res.render('login.html')
})

router.post('login', function(req, res) {
  console.log('req', req)

  const username = req.body.username
  const password = req.body.password
})

module.exports = router
