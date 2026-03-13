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

export interface ProductImage {
  id: string;
  url: string;
  isPrimary: boolean;
}

export interface ProductDetail {
  id: string;
  name: string;
  description: string | null;
  price: number;
  mrp: number | null;
  stock: number;
  brand: string | null;
  specifications: Record<string, unknown>;
  category: {
    id: string;
    name: string;
    slug: string;
    parent: {
      id: string;
      name: string;
      slug: string;
    } | null;
  } | null;
  images: ProductImage[];
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
