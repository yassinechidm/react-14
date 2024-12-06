import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <div className="relative pb-[100%] mb-4">
        <img 
          src={product.image} 
          alt={product.title} 
          className="absolute top-0 left-0 w-full h-full object-contain"
        />
      </div>
      
      <h3 className="text-lg font-semibold mb-2 line-clamp-2 flex-grow">{product.title}</h3>
      
      <div className="flex items-center mb-2">
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={16}
              className={index < Math.floor(product.rating.rate) 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
              }
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-600">
          ({product.rating.count} reviews)
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{product.description}</p>
      
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2 transition-colors"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}