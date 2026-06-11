const { logger, serializeError } = require('../utils/logger.utils');

function errorMiddleware(err, req, res, _next) {
  const statusCode = err.code === 'LIMIT_FILE_SIZE' ? 400 : err.status || 500;
  const message = err.code === 'LIMIT_FILE_SIZE' ? 'Image size cannot exceed 4MB' : err.message;

  logger.error('request:error', {
    requestId: req.requestId,
    method: req.method,
    path: req.originalUrl,
    statusCode,
    error: serializeError(err),
    details: err.details
  });

  res.status(statusCode).json({
    message: message || 'Server error',
    requestId: req.requestId,
    details: err.details
  });
}

module.exports = { errorMiddleware };
