const { Router } = require('express');
const multer = require('multer');

const { requireAuth } = require('../../middleware/auth.middleware');
const { asyncHandler } = require('../../utils/async.utils');
const { uploadProductImagesController } = require('./uploads.controller');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 4 * 1024 * 1024,
    files: 6
  }
});

const uploadsRouter = Router();

uploadsRouter.post(
  '/products',
  requireAuth,
  upload.array('images', 6),
  asyncHandler(uploadProductImagesController)
);

module.exports = { uploadsRouter };
