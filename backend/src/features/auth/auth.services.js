const bcrypt = require('bcryptjs');

const { UserModel } = require('./auth.models');
const { createHttpError } = require('../../utils/http.utils');

async function authenticateUser({ username, password }) {
  const user = await UserModel.findOne({ username });
  const isValid = user ? await bcrypt.compare(password, user.passwordHash) : false;

  if (!isValid) {
    throw createHttpError(401, 'Invalid username or password');
  }

  return user;
}

module.exports = { authenticateUser };
