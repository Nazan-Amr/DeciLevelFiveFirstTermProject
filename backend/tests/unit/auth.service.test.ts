import { register, login, getCurrentUser } from '../../src/services/auth.service';
import prisma from '../../src/config/database';
import { hashPassword, comparePassword } from '../../src/utils/password';
import { generateToken } from '../../src/utils/jwt';

jest.mock('../../src/config/database', () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn()
    }
  }
}));

jest.mock('../../src/utils/password');
jest.mock('../../src/utils/jwt');

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should create a new user and return token', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test',
        role: 'CUSTOMER',
        password: 'hashed'
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);
      (hashPassword as jest.Mock).mockReturnValue('hashed');
      (generateToken as jest.Mock).mockReturnValue('token');

      const result = await register('test@example.com', 'password123', 'Test');

      expect(result).toEqual({
        user: { id: '1', email: 'test@example.com', name: 'Test', role: 'CUSTOMER' },
        token: 'token'
      });
    });

    it('should throw error if email exists', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: '1' });

      await expect(register('test@example.com', 'password', 'Test'))
        .rejects.toThrow('Email already registered');
    });
  });

  describe('login', () => {
    it('should return user and token for valid credentials', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test',
        role: 'CUSTOMER',
        password: 'hashed'
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (comparePassword as jest.Mock).mockResolvedValue(true);
      (generateToken as jest.Mock).mockReturnValue('token');

      const result = await login('test@example.com', 'password');

      expect(result.token).toBe('token');
    });

    it('should throw error for invalid credentials', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(login('test@example.com', 'password'))
        .rejects.toThrow('Invalid credentials');
    });
  });
});