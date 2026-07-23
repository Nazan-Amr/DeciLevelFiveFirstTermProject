import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../../components/ui/ProductCard';
import { Product } from '../../types';

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'A great test product',
  price: 99.99,
  stock: 10,
  imageUrl: null,
  categoryId: '1',
  category: { id: '1', name: 'Electronics', slug: 'electronics' },
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01'
};

vi.mock('../../hooks/useCart', () => ({
  useCart: () => ({
    addToCart: vi.fn()
  })
}));

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('has add to cart button', () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );

    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });
});