const fs = require('fs');
const path = require('path');

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};

const activeLevel = process.env.LOG_LEVEL || 'info';
const logToFile = process.env.LOG_TO_FILE !== 'false';
const logDirectory = path.join(__dirname, '../../logs');
const logFile = path.join(logDirectory, 'app.log');

function shouldLog(level) {
  return levels[level] <= levels[activeLevel];
}

function serializeError(error) {
  if (!error) return undefined;

  return {
    message: error.message,
    name: error.name,
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack
  };
}

function write(level, message, meta = {}) {
  if (!shouldLog(level)) return;

  const payload = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta
  };

  const line = JSON.stringify(payload);
  const output = level === 'error' ? console.error : console.log;
  output(line);

  if (logToFile) {
    fs.mkdirSync(logDirectory, { recursive: true });
    fs.appendFile(logFile, `${line}\n`, (error) => {
      if (error) console.error(error);
    });
  }
}

const logger = {
  debug(message, meta) {
    write('debug', message, meta);
  },
  error(message, meta) {
    write('error', message, meta);
  },
  info(message, meta) {
    write('info', message, meta);
  },
  warn(message, meta) {
    write('warn', message, meta);
  }
};

module.exports = { logger, serializeError };
