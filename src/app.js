const express = require('express');
const logger = require('./common/winston');
const { handleError, ErrorHandler } = require('./common/error.js');
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

/* app.use((req, res, next) => {


  next(err);
});*/

// eslint-disable-next-line no-unused-vars
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
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

module.exports = app;
