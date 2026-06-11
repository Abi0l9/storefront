const dotenv = require('dotenv');

const { createApp } = require('./app');
const { connectDb } = require('./config/db');
const { seedDefaults } = require('./seed');
const { logger, serializeError } = require('./utils/logger.utils');

dotenv.config();

const port = process.env.PORT || 5000;

async function start() {
  await connectDb();

  if (process.env.SEED_DEFAULTS !== 'false') {
    await seedDefaults();
  }

  const app = createApp();

  app.listen(port, () => {
    logger.info('server:listening', { port });
  });
}

start().catch((error) => {
  logger.error('server:start_failed', { error: serializeError(error) });
  process.exit(1);
});
