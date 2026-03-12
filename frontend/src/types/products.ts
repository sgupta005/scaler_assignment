export interface SearchSuggestion {
  id: string;
  name: string;
  image: string;
  price: number;
}

export interface ProductListItem {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  stock: number;
  brand: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface ProductListResponse {
  items: ProductListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface FetchProductsParams {
  search?: string;
  categoryId?: string;
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'newest';
  page?: number;
  pageSize?: number;
}
