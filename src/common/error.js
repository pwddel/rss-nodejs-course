const logger = require('./winston');
const { BAD_REQUEST, getStatusText } = require('http-status-codes');

class ValidationError extends Error {
  constructor() {
    super();
    this.statusCode = BAD_REQUEST;
    this.message = getStatusText(this.statusCode);
    logger.error(
      `Validation ERROR - status code:${this.statusCode} Error message:${this.message}`
    );
  }
}

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
  handleError,
  ValidationError
};
