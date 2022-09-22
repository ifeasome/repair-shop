const { createLogger, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.File({
      level: 'info',
      filename: './logs/combined.log',
      maxsize: 5242880 // 5 MB
    }),
    new transports.File({
      level: 'error',
      filename: './logs/errors.log',
      maxsize: 5242880 // 5 MB
    }),
    new transports.Console({
      level: 'error'
    })
  ]
});

module.exports = logger;