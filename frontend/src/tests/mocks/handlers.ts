import { http, HttpResponse } from 'msw';

const API_URL = 'http://localhost:3000/api';

export const handlers = [
  // Auth
  http.post(`${API_URL}/auth/login`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        user: { id: '1', email: 'test@example.com', name: 'Test User', role: 'CUSTOMER' },
        token: 'mock-token'
      }
    });
  }),

  http.get(`${API_URL}/auth/me`, () => {
    return HttpResponse.json({
      success: true,
      data: { id: '1', email: 'test@example.com', name: 'Test User', role: 'CUSTOMER' }
    });
  }),

  // Products
  http.get(`${API_URL}/products`, () => {
    return HttpResponse.json({
      success: true,
      data: {
        products: [
          {
            id: '1',
            name: 'Test Product',
            description: 'A test product',
            price: 99.99,
            stock: 10,
            imageUrl: null,
            categoryId: '1',
            category: { id: '1', name: 'Test Category', slug: 'test' },
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01'
          }
        ],
        pagination: { page: 1, limit: 12, total: 1, totalPages: 1 }
      }
    });
  }),

  // Categories
  http.get(`${API_URL}/categories`, () => {
    return HttpResponse.json({
      success: true,
      data: [{ id: '1', name: 'Test Category', slug: 'test', _count: { products: 1 } }]
    });
  }),

  // Cart
  http.get(`${API_URL}/cart`, () => {
    return HttpResponse.json({
      success: true,
      data: { items: [], total: 0 }
    });
  }),

  // Orders
  http.get(`${API_URL}/orders`, () => {
    return HttpResponse.json({
      success: true,
      data: []
    });
  })
];