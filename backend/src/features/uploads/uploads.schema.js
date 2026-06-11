const { createHttpError } = require('../../utils/http.utils');

const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

function validateUploadFiles(files) {
  if (!Array.isArray(files) || !files.length) {
    throw createHttpError(400, 'At least one image is required');
  }

  files.forEach((file) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      throw createHttpError(400, 'Only JPG, PNG, and WEBP images are allowed');
    }
  });

  return files;
}

module.exports = { validateUploadFiles };
