const express = require('express');
const { loggerMiddleware } = require('./common/winston');
const {
  handleError,
  handleServerError,
  ErrorHandler,
  ValidationError
} = require('./common/error.js');
const validate = require('uuid-validate');
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
  next();
});

app.use(loggerMiddleware);

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
  handleServerError(res);
});

module.exports = app;
