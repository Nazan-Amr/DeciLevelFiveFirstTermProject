import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../../pages/HomePage';

vi.mock('../../stores/productStore', () => ({
  useProductStore: () => ({
    products: [],
    isLoading: false,
    fetchProducts: vi.fn()
  })
}));

describe('HomePage', () => {
  it('renders hero section', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText('Welcome to ShopNow')).toBeInTheDocument();
    expect(screen.getByText('Shop Now')).toBeInTheDocument();
  });
});