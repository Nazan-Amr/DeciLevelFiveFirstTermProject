import { getCart, addToCart, updateCartItem, removeFromCart } from '../../src/services/cart.service';
import prisma from '../../src/config/database';

jest.mock('../../src/config/database', () => ({
  __esModule: true,
  default: {
    cartItem: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }
}));

describe('Cart Service', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should get cart with total', async () => {
    const mockItems = [{
      id: '1', quantity: 2,
      product: { price: 10.00, category: {} }
    }];
    (prisma.cartItem.findMany as jest.Mock).mockResolvedValue(mockItems);

    const result = await getCart('user-1');

    expect(result.total).toBe(20);
  });
});