const { PORT } = require('./common/config');
const logger = require('./common/winston');
const app = require('./app');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

process
  .on('unhandledRejection', (reason, promise) => {
    logger.info('Unhandled Rejection at Promise', reason, promise);
  })
  .on('uncaughtException', err => {
    logger.info(`Uncaught Exception thrown: ${err.message}`, err);
  });
