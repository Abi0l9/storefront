const { sendCreated } = require('../../utils/http.utils');
const { validateOrderPayload } = require('./orders.schema');
const orderService = require('./orders.services');

async function createOrderController(req, res) {
  const items = validateOrderPayload(req.body);
  const order = await orderService.createOrder(req.user._id, items);
  sendCreated(res, order);
}

module.exports = { createOrderController };
