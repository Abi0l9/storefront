const { ProductModel } = require('./products.models');
const { buildProductQuery } = require('./products.utils');
const { createHttpError } = require('../../utils/http.utils');

async function listProducts(filters) {
  const query = buildProductQuery(filters);
  const skip = (filters.page - 1) * filters.limit;

  const [items, total, categories] = await Promise.all([
    ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(filters.limit),
    ProductModel.countDocuments(query),
    ProductModel.distinct('category')
  ]);

  return {
    items,
    total,
    page: filters.page,
    pages: Math.ceil(total / filters.limit) || 1,
    categories: categories.sort()
  };
}

async function getProductById(id) {
  const product = await ProductModel.findById(id);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  return product;
}

async function createProduct(payload) {
  return ProductModel.create(payload);
}

async function updateProduct(id, payload) {
  const product = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  });

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  return product;
}

async function deleteProduct(id) {
  const product = await ProductModel.findByIdAndDelete(id);

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct
};
