import { Route, Routes } from 'react-router';
import { Layout } from './components/layout';
import { ProductListPage } from './pages/product-list-page';
import { ProductDetailPage } from './pages/product-detail-page';
import { CartPage } from './pages/cart-page';
import { CheckoutPage } from './pages/checkout-page';
import { OrderConfirmationPage } from './pages/order-confirmation-page';
import { OrderHistoryPage } from './pages/order-history-page';
import { WishlistPage } from './pages/wishlist-page';
import { SearchResultsPage } from './pages/search-results-page';
import { AuthPage } from './features/auth/auth-page';

export default function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/login" element={<AuthPage />} />
              <Route path="/" element={<ProductListPage />} />
              <Route path="/products" element={<ProductListPage />} />
              <Route
                path="/products/:productId"
                element={<ProductDetailPage />}
              />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route
                path="/order/:orderId"
                element={<OrderConfirmationPage />}
              />
              <Route path="/orders" element={<OrderHistoryPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}
