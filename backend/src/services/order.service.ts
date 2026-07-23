import prisma from '../config/database';

export const createOrder = async (userId: string) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Get cart items
    const cartItems = await tx.cartItem.findMany({
      where: { userId },
      include: { product: true }
    });

    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    // 2. Check stock
    for (const item of cartItems) {
      if (item.product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${item.product.name}`);
      }
    }

    // 3. Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + (Number(item.product.price) * item.quantity);
    }, 0);

    // 4. Create order
    const order = await tx.order.create({
      data: {
        userId,
        total,
        status: 'PENDING',
        orderItems: {
          create: cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      },
      include: {
        orderItems: {
          include: { product: true }
        },
        user: true
      }
    });

    // 5. Deduct stock
    for (const item of cartItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }
      });
    }

    // 6. Clear cart
    await tx.cartItem.deleteMany({
      where: { userId }
    });

    return order;
  });
};

export const getOrders = async (userId?: string) => {
  const where = userId ? { userId } : {};
  
  return prisma.order.findMany({
    where,
    include: {
      user: true,
      orderItems: {
        include: { product: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};

export const getOrderById = async (id: string) => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      orderItems: {
        include: { product: true }
      }
    }
  });
};

export const updateOrderStatus = async (id: string, status: string) => {
  return prisma.order.update({
    where: { id },
    data: { status },
    include: {
      user: true,
      orderItems: {
        include: { product: true }
      }
    }
  });
};