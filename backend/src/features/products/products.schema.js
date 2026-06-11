const { createHttpError } = require('../../utils/http.utils');

function parseImageUrls(body) {
  const imageUrls = Array.isArray(body.imageUrls) ? body.imageUrls : [];
  const imageUrl = String(body.imageUrl || '').trim();
  const merged = imageUrl ? [imageUrl, ...imageUrls] : imageUrls;

  return [...new Set(merged.map((url) => String(url).trim()).filter(Boolean))];
}

function validateProductPayload(body) {
  const imageUrls = parseImageUrls(body);

  const payload = {
    name: String(body.name || '').trim(),
    description: String(body.description || '').trim(),
    category: String(body.category || '').trim(),
    price: Number(body.price),
    imageUrl: imageUrls[0] || '',
    imageUrls,
    stock: Number(body.stock || 0)
  };

  if (!payload.name || !payload.description || !payload.category) {
    throw createHttpError(400, 'Name, description, and category are required');
  }

  if (!Number.isFinite(payload.price) || payload.price < 0) {
    throw createHttpError(400, 'Price must be a valid positive number');
  }

  if (!Number.isFinite(payload.stock) || payload.stock < 0) {
    throw createHttpError(400, 'Stock must be a valid positive number');
  }

  return payload;
}

function parseProductFilters(query) {
  return {
    search: String(query.search || '').trim(),
    category: String(query.category || '').trim(),
    minPrice: query.minPrice ? Number(query.minPrice) : null,
    maxPrice: query.maxPrice ? Number(query.maxPrice) : null,
    page: Math.max(Number(query.page || 1), 1),
    limit: Math.min(Math.max(Number(query.limit || 8), 1), 50)
  };
}

module.exports = { parseProductFilters, validateProductPayload };
