const { cloudinary, configureCloudinary } = require('../../config/cloudinary');
const { createHttpError } = require('../../utils/http.utils');
const { uploadBufferToCloudinary } = require('./uploads.utils');

async function uploadProductImages(files) {
  const configured = configureCloudinary();

  if (!configured) {
    throw createHttpError(500, 'Cloudinary environment variables are not configured');
  }

  const uploads = await Promise.all(
    files.map((file) => {
      return uploadBufferToCloudinary(cloudinary, file, 'store/products');
    })
  );

  return uploads.map((upload) => upload.secure_url);
}

module.exports = { uploadProductImages };
