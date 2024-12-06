import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { getProducts, getCategories } from '../api/products';
import { ProductCard } from './ProductCard';
import { SearchBar } from './SearchBar';
import { CategoryFilter } from './CategoryFilter';
import { Pagination } from './Pagination';
import { useCart } from '../context/CartContext';

const ITEMS_PER_PAGE = 6;

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories()
      ]);
      setProducts(productsData);
      setFilteredProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(query: string) {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    setSelectedCategory(null);
    setCurrentPage(1);
  }

  function handleCategorySelect(category: string | null) {
    setSelectedCategory(category);
    if (category) {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
    setCurrentPage(1);
  }

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl">Loading products...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl text-red-500">{error}</p>
    </div>
  );

  return (
    <div>
      <div className="mb-8 flex justify-between items-start">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}