export interface WishlistProduct {
  id: string;
  name: string;
  price: number;
  mrp: number | null;
  image: string;
  stock: number;
  brand: string | null;
}

export interface WishlistItem {
  id: string;
  addedAt: string;
  product: WishlistProduct;
}
