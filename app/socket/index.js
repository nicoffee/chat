const config = require('../config')
const async = require('async')
const cookie = require('cookie')
const sessionStore = require('./../lib/sessionStore')
const HttpError = require('./../error').HttpError
const User = require('./../models/user').User
const cookieParser = require('cookie-parser')

function loadSession(sid, callback) {
  sessionStore.load(sid, function(err, session) {
    if (arguments.length == 0) {
      return callback(null, null)
    } else {
      return callback(null, session)
    }
  })
}

function loadUser(session, callback) {
  if (session && !session.user) {
    return callback(null, null)
  }

  if (session) {
    User.findById(session.user, function(err, user) {
      if (err) return callback(err)

      if (!user) {
        return callback(null, null)
      }
      callback(null, user)
    })
  }
}

module.exports = server => {
  const io = require('socket.io').listen(server)

  io.set('origins', 'localhost:*')

  io.use(function(socket, next) {
    async.waterfall(
      [
        function(callback) {
          socket.handshake.cookies = cookie.parse(
            socket.handshake.headers.cookie || ''
          )
          const sidCookie = socket.handshake.cookies[config.get('session:key')]

          const sid = cookieParser.signedCookie(
            sidCookie,
            config.get('session:secret')
          )

          loadSession(sid, callback)
        },
        function(session, callback) {
          if (!session) {
            callback(new HttpError(401, 'No session'))
          }

          socket.handshake.session = session

          loadUser(session, callback)
        },
        function(user, callback) {
          if (!user) {
            callback(new HttpError(403, 'Anonymous session may not connect'))
          }

          socket.handshake.user = user

          callback(null)
        }
      ],
      function() {
        next()
      }
    )
  })

  io.on('session:reload', function(sid) {
    const clients = io.sockets.clients()

    clients.forEach(function(client) {
      if (client.handshake.session.id != sid) return

      loadSession(sid, function(err, session) {
        if (err) {
          client.emit('error', 'server error')
          client.disconnect()
          return
        }

        if (!session) {
          client.emit('logout')
          client.disconnect()
          return
        }

        client.handshake.session = session
      })
    })
  })

  io.on('connection', function(socket) {
    const username = socket.handshake.user.get('username')

    socket.broadcast.emit('join', username)

    socket.on('message', function(text, cb) {
      socket.broadcast.emit('message', username, text)
      cb && cb()
    })

    socket.on('disconnect', function() {
      socket.broadcast.emit('leave', username)
    })
  })
}
