const { validateLoginPayload } = require('./auth.schema');
const { authenticateUser } = require('./auth.services');
const { issueAuthToken, serializeUser } = require('./auth.utils');

async function loginController(req, res) {
  const payload = validateLoginPayload(req.body);
  const user = await authenticateUser(payload);

  res.json({
    token: issueAuthToken(user),
    user: serializeUser(user)
  });
}

async function meController(req, res) {
  res.json({ user: serializeUser(req.user) });
}

module.exports = { loginController, meController };
