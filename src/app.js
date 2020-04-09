const express = require('express');
const logger = require('./common/winston');
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
  console.log('---------START REQUEST------------');
  logger.info(`
  Request method: ${req.method} 
  Request original URL: ${req.originalUrl}  
  Request parameters: ${req.params}  
  Request body: ${req.body}`);

  console.log('---------END REQUEST------------');
  res.on('finish', () => {
    logger.info(`
  Request method: ${req.method} 
  Request original URL: ${req.originalUrl}
  Request parameters: ${req.params} 
  Response status code: ${res.statusCode}  
  Response body: ${req.body}`);
  });
  next();
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  console.error(err.stack);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

module.exports = app;
