import request from 'supertest';
import app from '../../src/app';

describe('Auth Routes', () => {
  describe('POST /api/auth/register', () => {
    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({});

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should validate email format', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'invalid', password: 'pass' });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/auth/me', () => {
    it('should require authentication', async () => {
      const response = await request(app)
        .get('/api/auth/me');

      expect(response.status).toBe(401);
    });
  });
});