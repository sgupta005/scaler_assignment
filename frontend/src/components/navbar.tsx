import { ChevronDown, ShoppingCart, CircleUser } from 'lucide-react';
import { Link } from 'react-router';
import { SearchBar } from './search-bar';
import { useCart } from '../context/cart-context';

export function Navbar() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-300">
      <div className="flex flex-col py-4 gap-4">
        {/* Logo */}
        <div className="rounded-xl w-max flex items-center gap-2 bg-yellow-300 px-7 py-2.5">
          <img src="/logo.png" alt="logo" className="size-6" />
          <span className="text-xs font-bold italic">Flipkart</span>
        </div>

        {/* Search Bar and Right Actions */}
        <div className="flex items-center justify-between px-3">
          {/* Search Bar */}
          <SearchBar />

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2  py-2 rounded-lg transition-colors group">
              <CircleUser size={22} strokeWidth={1.5} />
              <span className="text-[15px]">Account</span>
              <ChevronDown
                size={16}
                className="text-gray-500 group-hover:text-blue-600 transition-colors"
              />
            </button>

            <button className="flex items-center gap-1  py-2 rounded-lg transition-colors group">
              <span className="text-[15px]">More</span>
              <ChevronDown
                size={16}
                className="text-gray-500 group-hover:text-blue-600 transition-colors"
              />
            </button>

            <Link
              to="/cart"
              className="flex items-center gap-2 py-2 rounded-lg transition-colors hover:text-blue-600"
            >
              <div className="relative">
                <ShoppingCart size={22} strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#ff6161] text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex justify-center items-center border border-white font-semibold px-1">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
