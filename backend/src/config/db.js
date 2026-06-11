const mongoose = require('mongoose');
const { logger } = require('../utils/logger.utils');

async function connectDb() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required');
  }

  await mongoose.connect(process.env.MONGO_URI);
  logger.info('database:connected');
}

module.exports = { connectDb };
