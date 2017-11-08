module.exports = server => {
  const io = require('socket.io').listen(server)

  io.set('origins', 'localhost:*')

  io.on('connection', function(socket) {
    socket.on('message', function(text, cb) {
      socket.broadcast.emit('message', text)
      cb()
    })
  })
}
