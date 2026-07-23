import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../stores/productStore';
import ProductCard from '../components/ui/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const HomePage: React.FC = () => {
  const { products, isLoading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl text-white p-12 mb-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ShopNow</h1>
          <p className="text-lg mb-8 text-primary-100">
            Discover amazing products at unbeatable prices. Quality guaranteed.
          </p>
          <Link to="/products" className="inline-block bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-primary-600 hover:underline font-medium">
            View All
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Categories Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Electronics', 'Clothing', 'Books'].map((category) => (
          <Link
            key={category}
            to={`/products?category=${category.toLowerCase()}`}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <h3 className="text-xl font-semibold text-gray-900">{category}</h3>
            <p className="text-gray-600 mt-2">Explore our {category.toLowerCase()} collection</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;