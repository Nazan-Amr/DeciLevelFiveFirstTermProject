import prisma from '../config/database';

export const getProducts = async (filters: any) => {
  const { search, category, minPrice, maxPrice, sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 12 } = filters;
  
  const where: any = {};
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } }
    ];
  }
  
  if (category) {
    where.category = { slug: category };
  }
  
  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = parseFloat(minPrice);
    if (maxPrice) where.price.lte = parseFloat(maxPrice);
  }

  const skip = (page - 1) * limit;
  
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit
    }),
    prisma.product.count({ where })
  ]);

  // Convert Decimal price fields to numbers for JSON responses
  const productsNormalized = products.map((p: any) => ({
    ...p,
    price: Number(p.price)
  }));

  return {
    products: productsNormalized,
    pagination: {
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      total
    }
  };
};

export const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true }
  });

  if (!product) return null;

  return { ...product, price: Number((product as any).price) };
};

export const createProduct = async (data: any, imageUrl?: string) => {
  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      stock: parseInt(data.stock),
      categoryId: data.categoryId,
      imageUrl: imageUrl || null
    },
    include: { category: true }
  });

  return { ...product, price: Number((product as any).price) };
};

export const updateProduct = async (id: string, data: any, imageUrl?: string) => {
  const updateData: any = {
    name: data.name,
    description: data.description,
    price: parseFloat(data.price),
    stock: parseInt(data.stock),
    categoryId: data.categoryId
  };
  
  if (imageUrl !== undefined) {
    updateData.imageUrl = imageUrl;
  }
  const product = await prisma.product.update({
    where: { id },
    data: updateData,
    include: { category: true }
  });

  return { ...product, price: Number((product as any).price) };
};

export const deleteProduct = async (id: string) => {
  return prisma.product.delete({
    where: { id }
  });
};