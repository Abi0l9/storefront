const { sendCreated } = require('../../utils/http.utils');
const { parseProductFilters, validateProductPayload } = require('./products.schema');
const productService = require('./products.services');

async function listProductsController(req, res) {
  const filters = parseProductFilters(req.query);
  const products = await productService.listProducts(filters);
  res.json(products);
}

async function getProductController(req, res) {
  const product = await productService.getProductById(req.params.id);
  res.json(product);
}

async function createProductController(req, res) {
  const payload = validateProductPayload(req.body);
  const product = await productService.createProduct(payload);
  sendCreated(res, product);
}

async function updateProductController(req, res) {
  const payload = validateProductPayload(req.body);
  const product = await productService.updateProduct(req.params.id, payload);
  res.json(product);
}

async function deleteProductController(req, res) {
  await productService.deleteProduct(req.params.id);
  res.status(204).end();
}

module.exports = {
  createProductController,
  deleteProductController,
  getProductController,
  listProductsController,
  updateProductController
};
