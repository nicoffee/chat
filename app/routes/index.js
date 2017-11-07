const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
  res.render('index.html')
})

router.post('/login', function(req, res) {
  console.log('_POST_')
})

module.exports = router
