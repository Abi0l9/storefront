import type { ProductInput, ProductResponse, User } from './types';

const API_URL = import.meta.env.VITE_API_URL || '/api';

type RequestOptions = RequestInit & { token?: string | null };

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(body?.message || 'Request failed');
  }

  return body as T;
}

async function uploadRequest<T>(path: string, body: FormData, token: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body
  });
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(payload?.message || 'Upload failed');
  }

  return payload as T;
}

export function login(username: string, password: string) {
  return request<{ token: string; user: User }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
}

export function getMe(token: string) {
  return request<{ user: User }>('/auth/me', { token });
}

export function getProducts(params: URLSearchParams) {
  return request<ProductResponse>(`/products?${params.toString()}`);
}

export function getProduct(id: string) {
  return request<ProductInput & { _id: string }>(`/products/${id}`);
}

export function createProduct(data: ProductInput, token: string) {
  return request('/products', { method: 'POST', body: JSON.stringify(data), token });
}

export function updateProduct(id: string, data: ProductInput, token: string) {
  return request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data), token });
}

export function deleteProduct(id: string, token: string) {
  return request(`/products/${id}`, { method: 'DELETE', token });
}

export function createOrder(items: { productId: string; quantity: number }[], token: string) {
  return request('/orders', { method: 'POST', body: JSON.stringify({ items }), token });
}

export function uploadProductImages(files: File[], token: string) {
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));
  return uploadRequest<{ urls: string[] }>('/uploads/products', formData, token);
}
