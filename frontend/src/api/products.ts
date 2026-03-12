import type {
  FetchProductsParams,
  ProductListResponse,
  SearchSuggestion,
} from '../types/products';

export async function searchProducts(
  q: string,
  limit = 8,
): Promise<SearchSuggestion[]> {
  const params = new URLSearchParams({ q, limit: String(limit) });
  const res = await fetch(`/api/products/search?${params}`);
  if (!res.ok) {
    throw new Error(`Search failed: ${res.status}`);
  }
  const json = await res.json();
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

  const res = await fetch(`/api/products?${query}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  const json = await res.json();
  return json.data;
}
