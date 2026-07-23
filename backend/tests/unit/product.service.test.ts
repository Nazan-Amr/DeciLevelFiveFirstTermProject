import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../../src/services/product.service';
import prisma from '../../src/config/database';

jest.mock('../../src/config/database', () => ({
  __esModule: true,
  default: {
    product: {
      findMany: jest.fn(),
      count: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }
  }
}));

describe('Product Service', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should get products with filters', async () => {
    const mockProducts = [{ id: '1', name: 'Test' }];
    (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);
    (prisma.product.count as jest.Mock).mockResolvedValue(1);

    const result = await getProducts({ page: 1, limit: 12 });

    expect(result.products).toEqual(mockProducts);
    expect(result.pagination.totalPages).toBe(1);
  });

  it('should create product', async () => {
    const mockProduct = { id: '1', name: 'New Product' };
    (prisma.product.create as jest.Mock).mockResolvedValue(mockProduct);

    const result = await createProduct({ name: 'New', description: 'Desc', price: '10', stock: '5', categoryId: '1' });

    expect(result).toEqual(mockProduct);
  });
});