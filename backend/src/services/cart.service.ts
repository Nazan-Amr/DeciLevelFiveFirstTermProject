import prisma from '../config/database';

export const getCart = async (userId: string) => {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: {
      product: {
        include: { category: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  const total = cartItems.reduce((sum, item) => {
    return sum + (Number(item.product.price) * item.quantity);
  }, 0);

  return {
    items: cartItems,
    total
  };
};

export const addToCart = async (userId: string, productId: string, quantity: number) => {
  const existingItem = await prisma.cartItem.findUnique({
    where: {
      userId_productId: {
        userId,
        productId
      }
    }
  });

  if (existingItem) {
    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
      include: { product: { include: { category: true } } }
    });
  }

  return prisma.cartItem.create({
    data: {
      userId,
      productId,
      quantity
    },
    include: {
      product: { include: { category: true } }
    }
  });
};

export const updateCartItem = async (itemId: string, quantity: number) => {
  if (quantity <= 0) {
    return prisma.cartItem.delete({
      where: { id: itemId }
    });
  }

  return prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
    include: {
      product: { include: { category: true } }
    }
  });
};

export const removeFromCart = async (itemId: string) => {
  return prisma.cartItem.delete({
    where: { id: itemId }
  });
};

export const clearCart = async (userId: string) => {
  return prisma.cartItem.deleteMany({
    where: { userId }
  });
};