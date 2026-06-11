const jwt = require('jsonwebtoken');

const { UserModel } = require('../features/auth/auth.models');
const { createHttpError } = require('../utils/http.utils');

async function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';

    if (!token) {
      throw createHttpError(401, 'Authentication required');
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(payload.sub).select('_id username name');

    if (!user) {
      throw createHttpError(401, 'Invalid session');
    }

    req.user = user;
    next();
  } catch (error) {
    next(createHttpError(401, 'Invalid session'));
  }
}

module.exports = { requireAuth };
