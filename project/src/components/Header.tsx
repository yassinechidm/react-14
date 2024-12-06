import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart as CartIcon, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-gray-900">
          Simple Shop
        </Link>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <UserIcon size={20} />
              <span>{user?.name}</span>
              <button
                onClick={logout}
                className="flex items-center gap-1 text-red-500 hover:text-red-700"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Sign Up
              </Link>
            </div>
          )}
          <button
            onClick={onCartClick}
            className="relative p-2 hover:bg-gray-100 rounded-full"
          >
            <CartIcon size={24} />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}