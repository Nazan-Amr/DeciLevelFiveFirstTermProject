import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json({
      success: true,
      data: [],
      pagination: { page: 1, totalPages: 1, total: 0 }
    });
  }),

  http.get('/api/products/:id', () => {
    return HttpResponse.json({
      success: true,
      data: {
        id: '1',
        name: 'Test Product',
        description: 'Test',
        price: 99.99,
        stock: 10,
        imageUrl: null,
        categoryId: '1',
        category: { id: '1', name: 'Electronics', slug: 'electronics' }
      }
    });
  }),

  http.post('/api/auth/register', () => {
    return HttpResponse.json({
      success: true,
      data: {
        user: { id: '1', email: 'test@test.com', name: 'Test', role: 'CUSTOMER' },
        token: 'token'
      }
    });
  }),

  http.post('/api/auth/login', () => {
    return HttpResponse.json({
      success: true,
      data: {
        user: { id: '1', email: 'test@test.com', name: 'Test', role: 'CUSTOMER' },
        token: 'token'
      }
    });
  }),

  http.get('/api/cart', () => {
    return HttpResponse.json({
      success: true,
      data: { items: [], total: 0 }
    });
  }),

  http.get('/api/categories', () => {
    return HttpResponse.json({
      success: true,
      data: [
        { id: '1', name: 'Electronics', slug: 'electronics', _count: { products: 5 } }
      ]
    });
  }),

  http.get('/api/orders', () => {
    return HttpResponse.json({
      success: true,
      data: []
    });
  }),

  http.post('/api/orders', () => {
    return HttpResponse.json({
      success: true,
      data: { id: 'order-1', status: 'PENDING', total: 99.99 }
    });
  })
];