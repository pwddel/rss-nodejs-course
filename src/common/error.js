const logger = require('./winston');
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  getStatusText
} = require('http-status-codes');

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
  constructor(statusCode, message, data) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

const handleError = (req, res) => {
  const { statusCode, message, data } = req;
  logger.error(getStatusText(statusCode), req);
  res.status(statusCode).json({
    statusCode,
    message,
    errors: data
  });
};

const handleServerError = (req, res) => {
  logger.error(getStatusText(INTERNAL_SERVER_ERROR), req);
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
};

module.exports = {
  ErrorHandler,
  handleError,
  handleServerError,
  ValidationError
};
