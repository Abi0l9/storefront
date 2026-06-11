const { Router } = require('express');

const { requireAuth } = require('../../middleware/auth.middleware');
const { asyncHandler } = require('../../utils/async.utils');
const { createOrderController } = require('./orders.controller');

const ordersRouter = Router();

ordersRouter.post('/', requireAuth, asyncHandler(createOrderController));

module.exports = { ordersRouter };
