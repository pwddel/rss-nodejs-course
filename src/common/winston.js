const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  exitOnError: false,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'info'
    }),
    new transports.File({
      level: 'info',
      filename: `${__dirname}/logs/app.log`
    })
  ]
});

module.exports = logger;
