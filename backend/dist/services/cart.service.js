"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeFromCart = exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const database_1 = __importDefault(require("../config/database"));
const getCart = async (userId) => {
    const cartItems = await database_1.default.cartItem.findMany({
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
    // Normalize product price fields to numbers
    const itemsNormalized = cartItems.map((ci) => ({
        ...ci,
        product: { ...ci.product, price: Number(ci.product.price) }
    }));
    return {
        items: itemsNormalized,
        total
    };
};
exports.getCart = getCart;
const addToCart = async (userId, productId, quantity) => {
    const existingItem = await database_1.default.cartItem.findUnique({
        where: {
            userId_productId: {
                userId,
                productId
            }
        }
    });
    if (existingItem) {
        return database_1.default.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + quantity },
            include: { product: { include: { category: true } } }
        });
    }
    return database_1.default.cartItem.create({
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
exports.addToCart = addToCart;
const updateCartItem = async (itemId, quantity) => {
    if (quantity <= 0) {
        return database_1.default.cartItem.delete({
            where: { id: itemId }
        });
    }
    return database_1.default.cartItem.update({
        where: { id: itemId },
        data: { quantity },
        include: {
            product: { include: { category: true } }
        }
    });
};
exports.updateCartItem = updateCartItem;
const removeFromCart = async (itemId) => {
    return database_1.default.cartItem.delete({
        where: { id: itemId }
    });
};
exports.removeFromCart = removeFromCart;
const clearCart = async (userId) => {
    return database_1.default.cartItem.deleteMany({
        where: { userId }
    });
};
exports.clearCart = clearCart;
//# sourceMappingURL=cart.service.js.map