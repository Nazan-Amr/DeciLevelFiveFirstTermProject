import request from 'supertest';
import app from '../../src/app';

describe('Cart Routes', () => {
  it('should require auth for all cart endpoints', async () => {
    const getCart = await request(app).get('/api/cart');
    expect(getCart.status).toBe(401);

    const addItem = await request(app).post('/api/cart').send({});
    expect(addItem.status).toBe(401);
  });
});