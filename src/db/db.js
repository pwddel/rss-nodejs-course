const { logger } = require('../common/winston');
const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');

const users = [
  new User({ name: 'user1', login: 'admin', password: 'admin' }),
  new User({ name: 'user2', login: 'user', password: 'user' })
];

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on('error', err => {
    logger.error(`DB connection error: ${err.message}`, err);
  });

  db.once('open', () => {
    // we're connected!
    console.log('Connection SUCCESSFUL');
    // eslint-disable-next-line callback-return
    cb();
    users.forEach(user => user.save());
  });
};

module.exports = { connectToDB };
