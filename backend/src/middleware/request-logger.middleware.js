const crypto = require('crypto');

const { logger } = require('../utils/logger.utils');

const redactedHeaders = new Set(['authorization', 'cookie']);
const redactedBodyKeys = new Set(['password', 'token', 'passwordHash']);

function sanitizeHeaders(headers) {
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => {
      return [key, redactedHeaders.has(key.toLowerCase()) ? '[redacted]' : value];
    })
  );
}

function sanitizeBody(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return body;
  }

  return Object.fromEntries(
    Object.entries(body).map(([key, value]) => {
      return [key, redactedBodyKeys.has(key) ? '[redacted]' : value];
    })
  );
}

function requestLogger(req, res, next) {
  const requestId = req.headers['x-request-id'] || crypto.randomUUID();
  const startedAt = process.hrtime.bigint();

  req.requestId = requestId;
  res.setHeader('X-Request-Id', requestId);

  logger.info('request:start', {
    requestId,
    method: req.method,
    path: req.originalUrl,
    ip: req.ip,
    headers: sanitizeHeaders(req.headers),
    body: sanitizeBody(req.body)
  });

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1e6;

    logger.info('request:end', {
      requestId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Number(durationMs.toFixed(2))
    });
  });

  next();
}

module.exports = { requestLogger };
