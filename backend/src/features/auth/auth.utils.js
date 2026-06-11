const jwt = require('jsonwebtoken');

function issueAuthToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function serializeUser(user) {
  return {
    id: user._id,
    username: user.username,
    name: user.name
  };
}

module.exports = { issueAuthToken, serializeUser };
