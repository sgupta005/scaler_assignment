import { ChevronDown, ShoppingCart, CircleUser, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { SearchBar } from './search-bar';
import { useCart } from '../context/cart-context';
import { useAuth } from '../context/auth-context';
import { useState, useRef, useEffect } from 'react';

export function Navbar() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    setDropdownOpen(false);
    navigate('/');
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-300 px-2">
      <div className="flex flex-col py-4 gap-4">
        {/* Logo */}
        <Link to="/">
          <div className="rounded-xl w-max flex items-center gap-2 bg-yellow-300 px-7 py-2.5">
            <img src="/logo.png" alt="logo" className="size-6" />
            <span className="text-xs font-bold italic">Flipkart</span>
          </div>
        </Link>

        {/* Search Bar and Right Actions */}
        <div className="flex items-center justify-between px-3 gap-2">
          {/* Search Bar */}
          <SearchBar />

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 py-2 rounded-lg transition-colors group"
                >
                  <CircleUser size={22} strokeWidth={1.5} />
                  <span className="text-[15px] max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown
                    size={16}
                    className="text-gray-500 group-hover:text-blue-600 transition-colors"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/orders"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Wishlist
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 py-2 rounded-lg transition-colors group"
              >
                <CircleUser size={22} strokeWidth={1.5} />
                <span className="text-[15px]">Login</span>
              </Link>
            )}

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
