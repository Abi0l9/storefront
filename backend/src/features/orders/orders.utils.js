const { createHttpError } = require('../../utils/http.utils');

function toOrderItems(requestedItems, products) {
  return requestedItems.map((item) => {
    const product = products.find((candidate) => {
      return candidate._id.toString() === item.productId;
    });

    if (!product) {
      throw createHttpError(400, 'One or more products no longer exist');
    }

    return {
      product: product._id,
      name: product.name,
      quantity: item.quantity,
      price: product.price
    };
  });
}

function calculateOrderTotal(items) {
  return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
}

module.exports = { calculateOrderTotal, toOrderItems };
