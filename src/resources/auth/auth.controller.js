const { promisify } = require('util');
const JWT_SECRET_KEY = require('../../common/config').JWT_SECRET_KEY;
const jwt = require('jsonwebtoken');
const errorCatcher = require('./../../common/errorCatcher');
const User = require('./../users/user.model');
const { ErrorHandler } = require('../../common/error');

const signToken = (id, login) => {
  return jwt.sign({ id, login }, JWT_SECRET_KEY);
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id, user.login);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

const protect = errorCatcher(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new ErrorHandler(
        401,
        'You are not logged in! Please log in to get access.'
      )
    );
  }

  const decoded = await promisify(jwt.verify)(token, JWT_SECRET_KEY);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new ErrorHandler(
        401,
        'The user belonging to this token does no longer exist.'
      )
    );
  }
  next();
});

module.exports = {
  protect,
  createSendToken
};
