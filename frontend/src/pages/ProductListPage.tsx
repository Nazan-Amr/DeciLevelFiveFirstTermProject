import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ui/ProductCard';
import Pagination from '../components/ui/Pagination';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { getCategories } from '../api/category.api';
import { Category } from '../types';

const ProductListPage: React.FC = () => {
  const { products, pagination, isLoading, filters, setFilters } = useProducts();
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchInput, setSearchInput] = useState(filters.search || '');

  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data.data));
  }, []);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setFilters({ category });
    }
  }, [searchParams, setFilters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ search: searchInput });
  };

  const handleCategoryChange = (slug: string) => {
    setFilters({ category: slug === filters.category ? undefined : slug });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
            {/* Search */}
            <div>
              <h3 className="font-semibold mb-3">Search</h3>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="input-field"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </form>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      filters.category === cat.slug
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat.name} ({cat._count?.products || 0})
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="input-field text-sm"
                  value={filters.minPrice || ''}
                  onChange={(e) => setFilters({ minPrice: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="input-field text-sm"
                  value={filters.maxPrice || ''}
                  onChange={(e) => setFilters({ maxPrice: e.target.value })}
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-semibold mb-3">Sort By</h3>
              <select
                className="input-field"
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  setFilters({ sortBy, sortOrder: sortOrder as 'asc' | 'desc' });
                }}
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
              </select>
            </div>

            <button
              onClick={() => {
                setFilters({ search: undefined, category: undefined, minPrice: undefined, maxPrice: undefined, sortBy: 'createdAt', sortOrder: 'desc' });
                setSearchInput('');
              }}
              className="w-full text-primary-600 hover:underline text-sm"
            >
              Clear All Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <LoadingSpinner />
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {pagination && (
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={(page) => setFilters({ page })}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;