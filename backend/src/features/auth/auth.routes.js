const { Router } = require('express');

const { requireAuth } = require('../../middleware/auth.middleware');
const { asyncHandler } = require('../../utils/async.utils');
const { loginController, meController } = require('./auth.controller');

const authRouter = Router();

authRouter.post('/login', asyncHandler(loginController));
authRouter.get('/me', requireAuth, asyncHandler(meController));

module.exports = { authRouter };
