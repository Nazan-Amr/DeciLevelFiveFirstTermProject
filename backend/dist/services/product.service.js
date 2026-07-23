"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const database_1 = __importDefault(require("../config/database"));
const getProducts = async (filters) => {
    const { search, category, minPrice, maxPrice, sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 12 } = filters;
    const where = {};
    if (search) {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
        ];
    }
    if (category) {
        where.category = { slug: category };
    }
    if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {};
        if (minPrice !== undefined)
            where.price.gte = minPrice;
        if (maxPrice !== undefined)
            where.price.lte = maxPrice;
    }
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
        database_1.default.product.findMany({
            where,
            include: { category: true },
            orderBy: { [sortBy]: sortOrder },
            skip,
            take: limit
        }),
        database_1.default.product.count({ where })
    ]);
    return {
        products,
        pagination: {
            page,
            limit,
            total,
        }
    };
};
exports.getProducts = getProducts;
//# sourceMappingURL=product.service.js.map