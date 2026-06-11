const { ProductModel } = require('../products/products.models');
const { OrderModel } = require('./orders.models');
const { calculateOrderTotal, toOrderItems } = require('./orders.utils');

async function createOrder(userId, requestedItems) {
  const products = await ProductModel.find({
    _id: { $in: requestedItems.map((item) => item.productId) }
  });

  const items = toOrderItems(requestedItems, products);
  const total = calculateOrderTotal(items);

  return OrderModel.create({ user: userId, items, total });
}

module.exports = { createOrder };
