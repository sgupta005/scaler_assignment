export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface CategoryProduct {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  rating: number;
}

export interface CategorySection {
  category: Category;
  products: CategoryProduct[];
}

export interface CategorySectionsResponse {
  sections: CategorySection[];
  nextCursor: number | null;
  totalCategories: number;
}
