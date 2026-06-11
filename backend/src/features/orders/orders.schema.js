const { createHttpError } = require('../../utils/http.utils');

function validateOrderPayload(body) {
  const items = Array.isArray(body.items) ? body.items : [];

  if (!items.length) {
    throw createHttpError(400, 'Order must include at least one item');
  }

  return items.map((item) => ({
    productId: String(item.productId || ''),
    quantity: Math.max(Number(item.quantity || 1), 1)
  }));
}

module.exports = { validateOrderPayload };
