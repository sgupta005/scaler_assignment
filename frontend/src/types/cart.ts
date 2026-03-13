export interface CartProduct {
  id: string;
  name: string;
  price: number;
  mrp: number | null;
  image: string;
  stock: number;
  brand: string | null;
}

export interface CartItem {
  id: string;
  quantity: number;
  product: CartProduct;
}

export interface Cart {
  id: string;
  items: CartItem[];
}
