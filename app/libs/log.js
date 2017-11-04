const winston = require('winston')
const ENV = process.env.NODE_ENV

// console.log('ENV', ENV)

const getLogger = module => {
  const path = module.filename
    .split('/')
    .slice(-2)
    .join('/')

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        timestamp: function() {
          return Date.now()
        },
        colorize: true,
        level: ENV === 'development' ? 'debug' : 'error',
        label: path
      }),
      new winston.transports.File({ filename: 'info.log' })
    ]
  })
}

module.exports = getLogger
