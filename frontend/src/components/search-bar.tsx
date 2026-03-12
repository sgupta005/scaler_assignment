import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Search } from 'lucide-react';
import { searchProducts } from '../api/products';
import type { SearchSuggestion } from '../types/products';

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query.trim(), 300);

  useEffect(() => {
    if (!debouncedQuery) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    searchProducts(debouncedQuery)
      .then((items) => {
        if (cancelled) return;
        setSuggestions(items);
        setOpen(items.length > 0);
      })
      .catch(() => {
        if (!cancelled) setSuggestions([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  function handleSuggestionClick(suggestion: SearchSuggestion) {
    setOpen(false);
    setQuery(suggestion.name);
    navigate(`/products/${suggestion.id}`);
  }

  return (
    <div ref={containerRef} className="relative flex-1 max-w-3xl">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center w-full border-2 border-blue-400 rounded-lg px-4 py-2 hover:bg-white hover:border-blue-400 transition-colors bg-white">
          <Search
            size={22}
            className={`shrink-0 transition-colors ${loading ? 'text-blue-400 animate-pulse' : 'text-gray-500'}`}
            strokeWidth={1.5}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            placeholder="Search for Products, Brands and More"
            className="w-full bg-transparent border-none outline-none pl-4 text-[15px] text-gray-800 placeholder-[#717478]"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setOpen(false);
              }}
              className="shrink-0 text-gray-400 hover:text-gray-600 ml-2 text-lg leading-none"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </form>

      {open && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {suggestions.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => handleSuggestionClick(s)}
                className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-50 text-left transition-colors"
              >
                <img
                  src={s.image || '/image.png'}
                  alt={s.name}
                  className="w-10 h-10 object-contain shrink-0 rounded bg-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 truncate">{s.name}</p>
                  <p className="text-xs text-gray-500">
                    ₹{s.price.toLocaleString('en-IN')}
                  </p>
                </div>
                <Search size={14} className="text-gray-400 shrink-0" />
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate(`/search?q=${encodeURIComponent(query.trim())}`);
              }}
              className="flex items-center gap-2 w-full px-4 py-2.5 border-t border-gray-100 hover:bg-blue-50 text-blue-600 text-sm font-medium transition-colors"
            >
              <Search size={14} />
              See all results for &quot;{query.trim()}&quot;
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
