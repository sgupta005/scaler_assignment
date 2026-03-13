import { Link } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center flex-wrap gap-1 text-sm text-gray-500 px-4 py-3 bg-white border-b border-gray-100">
      {items.map((crumb, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1 min-w-0">
            {i === 0 ? (
              <Link
                to={crumb.href}
                className="hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <Home size={13} />
                <span>Home</span>
              </Link>
            ) : isLast ? (
              <span className="text-gray-800 font-medium truncate max-w-[200px]">
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.href}
                className="hover:text-blue-600 transition-colors truncate max-w-[160px]"
              >
                {crumb.label}
              </Link>
            )}
            {!isLast && (
              <ChevronRight size={13} className="shrink-0 text-gray-400" />
            )}
          </span>
        );
      })}
    </nav>
  );
}
