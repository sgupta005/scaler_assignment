import { apiFetch } from './client';
import type {
  FetchProductsParams,
  ProductDetail,
  ProductListResponse,
  SearchSuggestion,
} from '../types/products';

export async function fetchProductById(id: string): Promise<ProductDetail> {
  const json = await apiFetch<{ data: ProductDetail }>(`/api/products/${id}`);
  return json.data;
}

export async function searchProducts(
  q: string,
  limit = 8,
): Promise<SearchSuggestion[]> {
  const params = new URLSearchParams({ q, limit: String(limit) });
  const json = await apiFetch<{ data: { items: SearchSuggestion[] } }>(
    `/api/products/search?${params}`,
  );
  return json.data.items;
}

export async function fetchProducts(
  params: FetchProductsParams = {},
): Promise<ProductListResponse> {
  const query = new URLSearchParams();

  if (params.search) query.set('search', params.search);
  if (params.categoryId) query.set('categoryId', params.categoryId);
  if (params.categorySlug) query.set('categorySlug', params.categorySlug);
  if (params.minPrice !== undefined)
    query.set('minPrice', String(params.minPrice));
  if (params.maxPrice !== undefined)
    query.set('maxPrice', String(params.maxPrice));
  if (params.sortBy) query.set('sortBy', params.sortBy);
  if (params.page !== undefined) query.set('page', String(params.page));
  if (params.pageSize !== undefined)
    query.set('pageSize', String(params.pageSize));

  const json = await apiFetch<{ data: ProductListResponse }>(
    `/api/products?${query}`,
  );
  return json.data;
}
