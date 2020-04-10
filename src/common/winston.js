const { createLogger, transports, format } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'silly',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.json()
  ),
  transports: [
    new transports.Console({
      level: 'info'
    }),
    new transports.File({
      level: 'info',
      filename: path.join(__dirname, '/logs/app_info.log')
    }),
    new transports.File({
      level: 'error',
      filename: path.join(__dirname, '/logs/app_error.log')
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: path.join(__dirname, '/logs/exception.log')
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
      duration: `${ms}ms`
    });
  });
  next();
};

module.exports = {
  logger,
  loggerMiddleware
};
