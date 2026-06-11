const { Router } = require('express');

const { authRouter } = require('./features/auth/auth.routes');
const { ordersRouter } = require('./features/orders/orders.routes');
const { productsRouter } = require('./features/products/products.routes');
const { uploadsRouter } = require('./features/uploads/uploads.routes');

const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/orders', ordersRouter);
apiRouter.use('/uploads', uploadsRouter);

module.exports = { apiRouter };
