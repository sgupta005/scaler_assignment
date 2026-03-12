import { Route, Routes } from 'react-router';
import { ProductListPage } from './pages/product-list-page.tsx';
import { ProductDetailPage } from './pages/product-detail-page.tsx';
import { CartPage } from './pages/cart-page.tsx';
import { CheckoutPage } from './pages/checkout-page.tsx';
import { OrderConfirmationPage } from './pages/order-confirmation-page.tsx';
import { OrderHistoryPage } from './pages/order-history-page.tsx';
import { WishlistPage } from './pages/wishlist-page.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order/:orderId" element={<OrderConfirmationPage />} />
      <Route path="/orders" element={<OrderHistoryPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
    </Routes>
  );
}
