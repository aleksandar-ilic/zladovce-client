import type { Category, CreateOrderPayload, OrderResponse, Product } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5289';

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    cache: init?.cache ?? 'no-store',
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `API greška (${response.status})`);
  }

  return response.json() as Promise<T>;
}

export function getProducts(params?: {
  category?: string;
  featured?: boolean;
  q?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Product[]> {
  const search = new URLSearchParams();
  if (params?.category) search.set('category', params.category);
  if (params?.featured) search.set('featured', 'true');
  if (params?.q) search.set('q', params.q);
  if (params?.minPrice != null) search.set('minPrice', String(params.minPrice));
  if (params?.maxPrice != null) search.set('maxPrice', String(params.maxPrice));
  const qs = search.toString();
  return apiFetch<Product[]>(`/api/products${qs ? `?${qs}` : ''}`);
}

export function getProduct(id: number): Promise<Product> {
  return apiFetch<Product>(`/api/products/${id}`);
}

export function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>('/api/categories');
}

export function createOrder(payload: CreateOrderPayload): Promise<OrderResponse> {
  return apiFetch<OrderResponse>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
