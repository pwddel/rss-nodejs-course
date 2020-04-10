const logger = require('./winston');
/* const {BAD_REQUEST, getStatusText} = require('http-status-codes');*/

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    logger.error(
      `Status code:${this.statusCode} Error message:${this.message}`
    );
  }
}

/*
class ValidationError extends Error {
  status = BAD_REQUEST;
  text = getStatusText(this.status)
}
*/

const handleError = (err, res) => {
  const { statusCode, message } = err;

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};

module.exports = {
  ErrorHandler,
  handleError
  /* ValidationError*/
};
