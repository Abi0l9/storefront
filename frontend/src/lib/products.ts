import type { Product } from '../types';

export function getProductImages(product: Product) {
  const urls = [product.imageUrl, ...(product.imageUrls || [])]
    .map((url) => String(url || '').trim())
    .filter(Boolean);

  return [...new Set(urls)];
}

export function getPrimaryProductImage(product: Product) {
  return getProductImages(product)[0] || '/placeholder.png';
}
