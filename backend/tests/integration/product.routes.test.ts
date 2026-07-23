import request from 'supertest';
import app from '../../src/app';

describe('Product Routes', () => {
  it('GET /api/products should return products list', async () => {
    const response = await request(app)
      .get('/api/products');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('POST /api/products should require admin auth', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({});

    expect(response.status).toBe(401);
  });
});