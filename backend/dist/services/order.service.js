"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const database_1 = __importDefault(require("../config/database"));
const createOrder = async (userId) => {
    return await database_1.default.$transaction(async (tx) => {
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
exports.createOrder = createOrder;
const getOrders = async (userId) => {
    const where = userId ? { userId } : {};
    const orders = await database_1.default.order.findMany({
        where,
        include: {
            user: true,
            orderItems: {
                include: { product: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
    // Normalize Decimal fields
    return orders.map((o) => ({
        ...o,
        total: Number(o.total),
        orderItems: o.orderItems.map((it) => ({
            ...it,
            price: Number(it.price),
            product: { ...it.product, price: Number(it.product.price) }
        }))
    }));
};
exports.getOrders = getOrders;
const getOrderById = async (id) => {
    const order = await database_1.default.order.findUnique({
        where: { id },
        include: {
            user: true,
            orderItems: {
                include: { product: true }
            }
        }
    });
    if (!order)
        return null;
    return {
        ...order,
        total: Number(order.total),
        orderItems: order.orderItems.map((it) => ({
            ...it,
            price: Number(it.price),
            product: { ...it.product, price: Number(it.product.price) }
        }))
    };
};
exports.getOrderById = getOrderById;
const updateOrderStatus = async (id, status) => {
    const order = await database_1.default.order.update({
        where: { id },
        data: { status },
        include: {
            user: true,
            orderItems: {
                include: { product: true }
            }
        }
    });
    return {
        ...order,
        total: Number(order.total),
        orderItems: order.orderItems.map((it) => ({
            ...it,
            price: Number(it.price),
            product: { ...it.product, price: Number(it.product.price) }
        }))
    };
};
exports.updateOrderStatus = updateOrderStatus;
//# sourceMappingURL=order.service.js.map