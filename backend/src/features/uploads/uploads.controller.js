const { validateUploadFiles } = require('./uploads.schema');
const uploadService = require('./uploads.services');

async function uploadProductImagesController(req, res) {
  const files = validateUploadFiles(req.files);
  const urls = await uploadService.uploadProductImages(files);
  res.status(201).json({ urls });
}

module.exports = { uploadProductImagesController };
