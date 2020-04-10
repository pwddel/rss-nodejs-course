const express = require('express');
const logger = require('./common/winston');
const {
  handleError,
  ErrorHandler,
  ValidationError
} = require('./common/error.js');
const validate = require('uuid-validate');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router.js');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }

  const start = Date.now();
  logger.info(`
  ---------START REQUEST-----------
  Request method: ${req.method} 
  Request original URL: ${req.originalUrl}
  Request query:${req.query}  
  Request parameters: ${req.params}  
  Request body: ${req.body}`);

  res.on('finish', () => {
    const ms = Date.now() - start;
    logger.info(`
    ---------END REQUEST-----------
    Request method: ${req.method} 
    Request original URL: ${req.originalUrl}
    Request query:${req.query}  
    Request parameters: ${req.params} 
    Response status code: ${res.statusCode}  
    Response body: ${req.body}
    ms: ${ms}`);
  });
  next();
});

app.use('/*/:id', (req, res, next) => {
  if (!req.params.id || !validate(req.params.id)) {
    throw new ValidationError();
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err instanceof ErrorHandler) {
    handleError(err, res);
    return;
  }
  next(err);
});

app.use((err, req, res) => {
  logger.error(getStatusText(INTERNAL_SERVER_ERROR));
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
});

module.exports = app;
