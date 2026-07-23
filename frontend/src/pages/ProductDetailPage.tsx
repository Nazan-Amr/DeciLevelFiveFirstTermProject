import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../stores/productStore';
import { useCart } from '../hooks/useCart';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Button from '../components/ui/Button';
import { formatPrice } from '../utils/formatters';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentProduct, isLoading, fetchProduct } = useProductStore();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) fetchProduct(id);
  }, [id, fetchProduct]);

  const handleAddToCart = () => {
    if (currentProduct) {
      addToCart(currentProduct.id, quantity);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!currentProduct) return <div className="text-center py-12">Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-gray-100 rounded-xl overflow-hidden aspect-square">
          {currentProduct.imageUrl ? (
            <img
            src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${currentProduct.imageUrl}`}
              alt={currentProduct.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-primary-600 font-medium mb-2">{currentProduct.category.name}</p>
          <h1 className="text-3xl font-bold mb-4">{currentProduct.name}</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">{currentProduct.description}</p>

          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(currentProduct.price)}</span>
            <span className={`text-sm font-medium ${currentProduct.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {currentProduct.stock > 0 ? `${currentProduct.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          {currentProduct.stock > 0 && (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(currentProduct.stock, quantity + 1))}
                  className="px-4 py-2 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <Button onClick={handleAddToCart} className="flex-1">
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;