const { PORT } = require('./common/config');
const { logger } = require('./common/winston');
const app = require('./app');

process
  .on('unhandledRejection', (reason, promise) => {
    logger.info('Unhandled Rejection at Promise', reason, promise);
  })
  .on('uncaughtException', err => {
    logger.info(`Uncaught Exception: ${err.message}`, err);
  });

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
