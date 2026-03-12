import type { ReactNode } from 'react';
import { Navbar } from './navbar';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white max-w-6xl mx-auto">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
