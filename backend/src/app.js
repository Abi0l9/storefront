const path = require('path');
const express = require('express');
const cors = require('cors');

const { apiRouter } = require('./api.routes');
const { corsOptions } = require('./config/cors');
const { errorMiddleware } = require('./middleware/error.middleware');
const { requestLogger } = require('./middleware/request-logger.middleware');

function createApp() {
  const app = express();
  const frontendDist = path.join(__dirname, '../../frontend/dist');

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(requestLogger);

  app.use('/api', apiRouter);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(frontendDist));
    app.get(/.*/, (_req, res) => {
      res.sendFile(path.join(frontendDist, 'index.html'));
    });
  }

  app.use(errorMiddleware);

  return app;
}

module.exports = { createApp };
