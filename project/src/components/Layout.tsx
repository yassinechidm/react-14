import React, { useState } from 'react';
import { Header } from './Header';
import { Cart } from './Cart';
import { useCart } from '../context/CartContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        cartItemsCount={items.length}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-grow">
            {children}
          </div>
          {isCartOpen && (
            <div className="w-80">
              <Cart />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}