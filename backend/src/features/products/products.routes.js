const { Router } = require('express');

const { requireAuth } = require('../../middleware/auth.middleware');
const { asyncHandler } = require('../../utils/async.utils');
const productsController = require('./products.controller');

const productsRouter = Router();

productsRouter.get('/', asyncHandler(productsController.listProductsController));
productsRouter.get('/:id', asyncHandler(productsController.getProductController));
productsRouter.post('/', requireAuth, asyncHandler(productsController.createProductController));
productsRouter.put('/:id', requireAuth, asyncHandler(productsController.updateProductController));
productsRouter.delete(
  '/:id',
  requireAuth,
  asyncHandler(productsController.deleteProductController)
);

module.exports = { productsRouter };
