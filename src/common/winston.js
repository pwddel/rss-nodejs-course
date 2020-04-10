const { createLogger, transports, format } = require('winston');
const path = require('path');

const logger = createLogger({
  exitOnError: true,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
    format.json()
  ),
  transports: [
    new transports.Console({
      level: 'info'
    }),
    new transports.File({
      level: 'info',
      filename: path.join(__dirname, '/logs/app_info.log'),
      format: format.combine(format.uncolorize(), format.json())
    }),
    new transports.File({
      level: 'error',
      filename: path.join(__dirname, '/logs/app_error.log'),
      format: format.combine(format.uncolorize(), format.json())
    })
  ],
  exceptionTransport: [
    new transports.File({
      filename: path.join(__dirname, '/logs/exception.log'),
      format: format.combine(format.uncolorize(), format.json())
    })
  ]
});

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();
  logger.info('Start', {
    url: req.url,
    queryParams: req.query,
    body: req.body
  });

  res.on('finish', () => {
    const ms = Date.now() - start;
    logger.info('Finish', {
      url: req.url,
      queryParams: req.query,
      body: req.body,
      ms
    });
  });
  next();
};

module.exports = {
  logger,
  loggerMiddleware
};
