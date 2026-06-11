const { createHttpError } = require('../../utils/http.utils');

function validateLoginPayload(body) {
  const username = String(body.username || '').trim();
  const password = String(body.password || '');

  if (!username || !password) {
    throw createHttpError(400, 'Username and password are required');
  }

  return { username, password };
}

module.exports = { validateLoginPayload };
