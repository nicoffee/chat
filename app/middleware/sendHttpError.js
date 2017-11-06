module.exports = function(req, res, next) {
  res.sendHttpError = error => {
    res.status(error.status)
    if (res.req.headers['x-requested-with'] === 'XMLHttpRequest') {
      res.json(error)
    } else {
      res.render('error.html', { error: error })
    }
  }

  next()
}
