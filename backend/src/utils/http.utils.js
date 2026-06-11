function createHttpError(status, message, details) {
  const error = new Error(message);
  error.status = status;
  error.details = details;
  return error;
}

function sendCreated(res, data) {
  return res.status(201).json(data);
}

module.exports = { createHttpError, sendCreated };
