const User = require('./../users/user.model');
const errorCatcher = require('./../../common/errorCatcher');
const { ErrorHandler } = require('../../common/error');
const { createSendToken } = require('./auth.controller');

const loginUsers = errorCatcher(async (req, res, next) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return next(new ErrorHandler(400, 'Please provide login and password!'));
  }
  const user = await User.findOne({ login }).select('+password');
  console.log(user);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new ErrorHandler(403, 'Incorrect login or password'));
  }

  createSendToken(user, 200, res);
});

module.exports = {
  loginUsers
};
